import { Sequelize } from 'sequelize';
import { Response } from 'express';

import { formatResponse, formatError } from "../../utils/response"
import { CONTRACT_STATUSES, PROFILE_TYPES } from '../../utils/constants/contract';
import { IRequest } from '../../utils/interfaces/http.types';
import { sequelize } from '../../models/sequelize';
import { Contract } from '../../models/contract';
import { Job } from '../../models/job';
import { Profile } from '../../models/profile';

export async function deposit(req: IRequest, res: Response) {
    if(req.profile && req.profile.type !== PROFILE_TYPES.CLIENT) {
        return res.status(403).json(formatError('Operation not allowed'))
    }
    const profileId = req.profile?.id;
    const balance = req.profile?.balance || 0;
    const depositAmount = req.body.depositAmount;
    const transaction = await sequelize.transaction();

    try {

        const totalPrice: any = await Job.findAll({
            attributes: [[Sequelize.literal('SUM(job.price)'), 'total']],
            where: {
                paid: false,
            },
            include: [
                {
                    model: Contract,
                    as: 'contract',
                    where: {
                        clientId: profileId,
                        status: CONTRACT_STATUSES.IN_PROGRES,
                    },
                    attributes: []
                }
            ],
        })
        const maxDeposit = (totalPrice[0].dataValues.total * 25 / 100);
        const isDepositMoreThan25PrcentOfJobsToPay = (totalPrice[0].dataValues.total * 25 / 100) < depositAmount;
        if( isDepositMoreThan25PrcentOfJobsToPay ) {
            await transaction.rollback();
            return res.status(403).json(formatError(`You can deposit max ${maxDeposit.toFixed(2)} as it shouldn't be more than 25% of current unpaied jobs.`));
        }
        const newBalance = Number((balance + depositAmount).toFixed(2));
        Profile.update({balance: newBalance}, {where: {id: profileId}});
        await transaction.commit();
        return res.json(formatResponse({...req.profile?.dataValues, balance: newBalance}))
    } catch (error) {
        console.error(error);
        await transaction.rollback();
        return res.status(500).json(formatError('Something went wrong', [error]));
    }
}
