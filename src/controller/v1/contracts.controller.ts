import {Op} from 'sequelize';

import { formatResponse, formatError } from "../../utils/response";
import { CONTRACT_STATUSES } from '../../utils/constants/contract';
import { IRequest } from '../../utils/interfaces/http.types';
import { Response } from 'express';
import { Contract } from '../../models/contract';

export async function getContract(req: IRequest, res: Response) {
    try {
        const profileId = req.profile?.id;
        const contract = await Contract.findOne({
            where: {
                [Op.or]: {
                    contractorId: profileId,
                    clientId: profileId,
                },
                id: req.params.id
            }
        })
        if (!contract) return res.status(404).json(formatError('Contract not found'))
        return res.json(formatResponse(contract))
    } catch (error) {
        return res.status(500).json(formatError('Something went wrong'))
    }
}

export async function getContracts(req: IRequest, res: Response) {
    try {
        const profileId = req.profile?.id;
        const whereClause: any = {
            [Op.or]: {
                contractorId: profileId,
                clientId: profileId,
            },
        };
        if (req.query.contractorId) {
            whereClause[Op.and] = {
                contractorId: req.query.contractorId
            }
        }
        const contracts = await Contract.findAll({
            where: whereClause,
        });
        return res.json(formatResponse(contracts))
    } catch (error) {
        return res.status(500).json(formatError('Something went wrong'))
    }
}
