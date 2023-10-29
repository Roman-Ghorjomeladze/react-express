import { Sequelize } from 'sequelize';
import { Request, Response } from 'express';

import { formatResponse, formatError } from "../../utils/response";
import { Contract, Profile, Job } from '../../models';
import { CONTRACT_STATUSES } from '../../utils/constants/contract';
import { buildTopPayingWhereClause } from '../../utils/queryBuilders/admin.queryBuilder';
import { getPaginationParams } from '../../utils/general';

export async function getMostProfitablePosition(req: Request, res: Response) {
  try {
    const whereClaus = buildTopPayingWhereClause(req.query);
    const result = await Profile.findAll({
      attributes: ['profession', [Sequelize.fn('SUM', Sequelize.col('Contractor->Jobs.price')), 'amount']],
      include: [
        {
          model: Contract,
          as: 'Contractor',
          attributes: [],
          where: { status: CONTRACT_STATUSES.IN_PROGGRESS },
          include: [
            {
              model: Job,
              attributes: [],
              where: whereClaus
            },
          ],
        },
      ],
      order: [['amount', 'DESC']],
    });
    return res.json(formatResponse(result.length > 0 ? result[0] : null))
  } catch (error) {
    console.log(error)
    res.status(500).json(formatError('Something went wrong'))
  }
}

export async function getTopPayingClient(req: Request, res: Response) {
  try {
    const whereClaus = buildTopPayingWhereClause(req.query);
    const pagination = getPaginationParams(req.query, 2);

    const results = await Profile.findAll({
      attributes: [
        'id',
        [Sequelize.literal("SUM(price)"), 'totalCost'],
        [Sequelize.literal("firstName || ' ' || lastName"), 'name'],
      ],
      include: [
        {
          model: Contract,
          as: 'Client',
          attributes: [],
          include: [
            {
              model: Job,
              as: 'Jobs',
              attributes: [],
              where: whereClaus,
            },
          ],
        },
      ],
      where: {
        type: 'client',
      },
      group: ['Profile.id', 'name'],
      having: Sequelize.literal('totalCost IS NOT NULL'),
      order: [[Sequelize.literal('totalCost'), 'DESC']],
      limit: pagination.limit,
      offset: pagination.offset,
      subQuery: false,
    });
    return res.json(formatResponse(results))
  } catch (error) {
    res.status(500).json(formatError('Something went wrong'))
  }
}

export async function getUsers(req: Request, res: Response) {
  const users = await Profile.findAll({attributes: ['firstName', 'lastName', 'id']});
  return res.json(formatResponse(users));
}

