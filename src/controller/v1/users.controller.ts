import { Response } from "express";
import { IRequest } from "../../utils/interfaces/http.types";

import { formatResponse, formatError } from "../../utils/response";
import { Profile } from "../../models/profile";
import { prepareUserProfilesWhereClaus } from "../../utils/queryBuilders/user.qb";
import { Sequelize } from "sequelize";


export async function getUsers(req: IRequest, res: Response) {
  try {
    const whereClause = prepareUserProfilesWhereClaus(req.query, req.profile?.id);
    const users = await Profile.findAll({
      attributes: [
        'firstName',
        'lastName',
        'id',
        'type',
        'profession',
        'balance',
        [Sequelize.literal("firstName || ' ' || lastName"), 'name'],
      ],
      where: whereClause,
    });

    return res.json(formatResponse(users));
  } catch (error) {
    console.error(error);
    return res.status(500).json(formatError('Something went wrong'));
  }
}

export async function me(req: IRequest, res: Response) {
  try {
    return res.json(formatResponse(req.profile));
  } catch (error) {
    return res.status(500).json(formatError('Something went wrong'))
  }
}