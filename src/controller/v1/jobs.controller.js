const { Op } = require("sequelize");
const { Job, Contract, Profile, sequelize } = require("../../model");
const { formatResponse, formatError } = require("../../utils/response");
const { CONTRACT_STATUSES } = require("../../utils/constants/contract");

async function getUnpayedJobs(req, res) {
    try {
        const jobs = await Job.findAll({
            where: {
                paid: false,
            },
            include: [
                {
                    model: Contract,
                    where: {
                        [Op.or]: {
                            contractorId: req.profile.id,
                            clientId: req.profile.id,
                        },
                        [Op.and]: {
                            status: CONTRACT_STATUSES.IN_PROGGRESS,
                        },
                    },
                    attributes: [],
                },
            ],
        });
        return res.json(formatResponse(jobs));
    } catch (error) {
        return res.status(500).json(formatError("Something went wrong"));
    }
}

async function payJob(req, res) {
    // I'm not gonna check contract status as it's not in terms.
    const transaction = await sequelize.transaction();
    try {
        const job = await Job.findOne({
            where: {
                id: req.params.id,
            },
            include: [
                {
                    model: Contract,
                    where: {
                        clientId: req.profile.id,
                    },
                    include: [
                        {
                            model: Profile,
                            as: "Client",
                        },
                        {
                            model: Profile,
                            as: "Contractor",
                        },
                    ],
                },
            ],
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

        const contract = job.Contract;
        const client = job.Contract.Client;
        const contractor = job.Contract.Contractor;
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
        Profile.update(
            { balance: clientsNewBalance },
            { where: { id: client.id } }
        );
        Profile.update(
            { balance: contractorsNewBalance },
            { where: { id: contractor.id } }
        );
        Job.update({ paid: true }, { where: { id: job.id } });
        await transaction.commit();

        job.paid = true;
        job.Contract.Contractor.balance = contractorsNewBalance;
        job.Contract.Client.balance = clientsNewBalance;
        return res.json(formatResponse(job));
    } catch (error) {
        console.log(error)
        await transaction.rollback();
        return res.status(500).json(formatError("Something went wrong"));
    }
}

module.exports = { payJob, getUnpayedJobs };
