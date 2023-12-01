import { Op, Sequelize } from "sequelize";

type IQuery = {myContractors?: number, search?: string};
type IWhere = {[Op.and]?: any};

export const  prepareUserProfilesWhereClaus = (query: IQuery, profileId: number|undefined) => {
    let whereClause: IWhere = {};
    if (query.myContractors && profileId) {
      whereClause[Op.and] = [
        Sequelize.literal(`id IN (SELECT contractorId FROM contracts WHERE clientId = ${profileId})`),
        query.search ? Sequelize.literal(`firstName || ' ' || lastName LIKE '%${query.search}%'`) : null
      ].filter(Boolean);
    }
    return whereClause;
}