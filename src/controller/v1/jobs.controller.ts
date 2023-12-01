import { Op } from "sequelize";
import { formatResponse, formatError } from "../../utils/response";
import { CONTRACT_STATUSES } from "../../utils/constants/contract";
import { Response } from "express";
import { IRequest } from "../../utils/interfaces/http.types";
import { Contract } from "../../models/contract";
import { Job } from "../../models/job";
import { Profile } from "../../models/profile";
import { sequelize } from "../../models/sequelize";

export async function getJobs(req: IRequest, res: Response) {
    try {
        const profileId = req.profile?.id;
        let whereClaus: {paid?: number} = {};
        if (req.query.paid) {
            whereClaus['paid'] = Number(req.query.paid)
        }

        const nestedWhere: any = {
            [Op.or]: {
                contractorId: profileId,
                clientId: profileId,
            },
            [Op.and]: {
                status: CONTRACT_STATUSES.IN_PROGRES,
            },
        }
        if (req.query.contractorId && req.query.contractorId !== '0') {
            nestedWhere[Op.and]['contractorId'] = req.query.contractorId;
        }
        const jobs = await Job.findAll({
            where: whereClaus,
            include: [
                {
                    model: Contract,
                    as: 'contract',
                    where: nestedWhere,
                    attributes: [],
                },
            ],
        });
        return res.json(formatResponse(jobs));
    } catch (error) {
        console.error(error);
        return res.status(500).json(formatError("Something went wrong"));
    }
}
export async function unPaidJobs(req: IRequest, res: Response) {
    try {
        const profileId = req.profile?.id;

        const jobs = await Job.findAll({
            where: {paid: 0},
            include: [
                {
                    model: Contract,
                    as: 'contract',
                    where: {
                        [Op.or]: {
                            contractorId: profileId,
                            clientId: profileId,
                        },
                        [Op.and]: {
                            status: CONTRACT_STATUSES.IN_PROGRES,
                        },
                    },
                    attributes: [],
                },
            ],
        });
        return res.json(formatResponse(jobs));
    } catch (error) {
        console.error(error);
        return res.status(500).json(formatError("Something went wrong"));
    }
}

export async function payJob(req: IRequest, res: Response) {
    const transaction = await sequelize.transaction();
    try {
        const profileId = req.profile?.id;
        const job = await Job.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Contract,
                    as: 'contract',
                    where: {
                        clientId: profileId,
                    },
                    include: [
                        {
                            model: Profile,
                            as: "client",
                        },
                        {
                            model: Profile,
                            as: "contractor",
                        },
                    ],
                },
            ],
            transaction,
        });

        if (!job) {
            await transaction.rollback();
            return res.status(404).json(formatError("Job not found"));
        }
        // return error if job is already paid
        if (job.paid) {
            await transaction.rollback();
            return res.status(400).json(formatError("Job is already paid"));
        }

        const contract = job.contract;
        const client = job.contract?.client;
        const contractor = job.contract?.contractor;
        // Return error if somehow client, contract or contractor does not exists
        if (!contract || !client || !contractor) {
            await transaction.rollback();
            return res.status(400).json(formatError("Invalid job"));
        }
        // Return error if client's balance isn't enough to afford the price of the job
        if (client.balance < job.price) {
            await transaction.rollback();
            return res
                .status(400)
                .json(
                    formatError("You don't have enough money on balance", [
                        { balance: client.balance, jobPrice: job.price },
                    ])
                );
        }
        // Calculate changes of balance for both client and contractor
        const contractorsNewBalance = Number((contractor.balance + job.price).toFixed(2));
        const clientsNewBalance = Number((client.balance - job.price).toFixed(2));
        await Profile.update(
            { balance: clientsNewBalance },
            { where: { id: client.id },
            transaction,
        });
        await Profile.update(
            { balance: contractorsNewBalance },
            { where: { id: contractor.id },
            transaction
        });
        await Job.update({ paid: true, paymentDate: String(new Date()) }, { where: { id: job.id }, transaction });
        await transaction.commit();

        job.paid = true;
        job.paymentDate = String(new Date());
        contractor.balance = contractorsNewBalance;
        client.balance = clientsNewBalance;
        return res.json(formatResponse(job));
    } catch (error) {
        console.error(error)
        await transaction.rollback();
        return res.status(500).json(formatError("Something went wrong"));
    }
}

