"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareUserProfilesWhereClaus = void 0;
const sequelize_1 = require("sequelize");
const prepareUserProfilesWhereClaus = (query, profileId) => {
    let whereClause = {};
    if (query.myContractors && profileId) {
        whereClause[sequelize_1.Op.and] = [
            sequelize_1.Sequelize.literal(`id IN (SELECT contractorId FROM contracts WHERE clientId = ${profileId})`),
            query.search ? sequelize_1.Sequelize.literal(`firstName || ' ' || lastName LIKE '%${query.search}%'`) : null
        ].filter(Boolean);
    }
    return whereClause;
};
exports.prepareUserProfilesWhereClaus = prepareUserProfilesWhereClaus;
