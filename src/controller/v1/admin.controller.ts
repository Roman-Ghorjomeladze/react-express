import { Sequelize } from 'sequelize';
import { Request, Response } from 'express';

import { formatResponse, formatError } from "../../utils/response";
import { CONTRACT_STATUSES, PROFILE_TYPES } from '../../utils/constants/contract';
import { buildTopPayingWhereClause } from '../../utils/queryBuilders/admin.qb';
import { getPaginationParams } from '../../utils/general';
import { ProfitablePositionQuery } from '../../utils/interfaces/http.types';
import { Contract } from '../../models/contract';
import { Job } from '../../models/job';
import { Profile } from '../../models/profile';

export async function getMostProfitablePosition(req: Request, res: Response) {
  try {
    const whereClaus = buildTopPayingWhereClause(req.query as ProfitablePositionQuery);
    const result = await Profile.findAll({
      attributes: ['profession', [Sequelize.fn('SUM', Sequelize.col('contractor->jobs.price')), 'amount']],
      include: [
        {
          model: Contract,
          as: 'contractor',
          attributes: [],
          where: { status: CONTRACT_STATUSES.IN_PROGRES },
          include: [
            {
              model: Job,
              as: 'jobs',
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
    console.error(error)
    return res.status(500).json(formatError('Something went wrong'))
  }
}

export async function getTopPayingClient(req: Request, res: Response) {
  try {
    const whereClaus = buildTopPayingWhereClause(req.query as ProfitablePositionQuery);
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
          as: 'client',
          attributes: [],
          include: [
            {
              model: Job,
              as: 'jobs',
              attributes: [],
              where: whereClaus,
            },
          ],
        },
      ],
      where: {
        type: PROFILE_TYPES.CLIENT,
      },
      group: ['profile.id', 'name'],
      having: Sequelize.literal('SUM(price) IS NOT NULL'),
      order: [[Sequelize.literal('SUM(price)'), 'DESC']],
      limit: pagination.limit,
      offset: pagination.offset,
      subQuery: false,
    });
    return res.json(formatResponse(results))
  } catch (error) {
    console.error(error)
    return res.status(500).json(formatError('Something went wrong'))
  }
}

export async function getUsers(req: Request, res: Response) {
  const users = await Profile.findAll({attributes: ['firstName', 'lastName', 'id']});
  return res.json(formatResponse(users));
}

