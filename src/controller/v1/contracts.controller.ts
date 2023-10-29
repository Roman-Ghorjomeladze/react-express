import {Op} from 'sequelize';

import { formatResponse, formatError } from "../../utils/response";
import { Contract } from '../../models';
import { CONTRACT_STATUSES } from '../../utils/constants/contract';
import { IRequest } from '../../utils/interfaces/http.types';
import { Response } from 'express';

export async function getContract(req: IRequest, res: Response) {
    try {
        const contract = await Contract.findOne({
            where: {
                [Op.or]: {
                    ContractorId: req.profile.id, 
                    ClientId: req.profile.id, 
                },
                id: req.params.id
            }
        })
        if (!contract) return res.status(404).json(formatError('Contract not found'))
        return res.json(formatResponse(contract))
    } catch (error) {
        res.status(500).json(formatError('Something went wrong'))
    }
}

export async function getContracts(req: IRequest, res: Response) {
    try {
        const contracts = await Contract.findAll({
            where: {
                [Op.or]: {
                    ContractorId: req.profile.id, 
                    ClientId: req.profile.id, 
                },
                status: {[Op.not]: CONTRACT_STATUSES.TERMINATED}
            }
        });
        return res.json(formatResponse(contracts))
    } catch (error) {
        res.status(500).json(formatError('Something went wrong'))
    }
}
