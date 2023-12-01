"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTopPayingWhereClause = void 0;
const sequelize_1 = require("sequelize");
const general_1 = require("../general");
const buildTopPayingWhereClause = (params) => {
    const whereClaus = { paid: true };
    for (const key in params) {
        switch (key) {
            case 'start': {
                const date = (0, general_1.isDateValid)(params.start);
                if (date) {
                    whereClaus[sequelize_1.Op.gt] = date;
                }
                break;
            }
            case 'end': {
                const date = (0, general_1.isDateValid)(params.end);
                if (date) {
                    if (date) {
                        whereClaus[sequelize_1.Op.lt] = date;
                    }
                }
                break;
            }
        }
    }
    return whereClaus;
};
exports.buildTopPayingWhereClause = buildTopPayingWhereClause;
