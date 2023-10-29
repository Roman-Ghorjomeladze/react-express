"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTopPayingWhereClause = void 0;
const sequelize_1 = require("sequelize");
const general_1 = require("../general");
const buildTopPayingWhereClause = (params) => {
    let whereClaus = Object.assign(Object.assign({}, params), { paid: true }); //TODO Resolve Any type
    for (let key in params) {
        switch (key) {
            case 'start': {
                const date = (0, general_1.isDateValid)(params[key]);
                if (date) {
                    whereClaus[sequelize_1.Op.gt] = date;
                }
                break;
            }
            case 'end': {
                const date = (0, general_1.isDateValid)(params[key]);
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
//# sourceMappingURL=admin.queryBuilder.js.map