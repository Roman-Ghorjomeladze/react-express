"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const sequelize_1 = require("./sequelize");
const profile_1 = require("./profile");
const job_1 = require("./job");
const sequelize_2 = require("sequelize");
const contract_1 = require("../utils/constants/contract");
class Contract extends sequelize_2.Model {
}
exports.Contract = Contract;
Contract.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    terms: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: sequelize_2.DataTypes.ENUM(...Object.values(contract_1.CONTRACT_STATUSES)),
    },
}, {
    sequelize: sequelize_1.sequelize,
    modelName: "contract",
});
Contract.belongsTo(profile_1.Profile, { as: "contractor", foreignKey: "contractorId" });
Contract.belongsTo(profile_1.Profile, { as: "client", foreignKey: "clientId" });
profile_1.Profile.hasMany(Contract, { as: "contractor", foreignKey: "contractorId" });
profile_1.Profile.hasMany(Contract, { as: "client", foreignKey: "clientId" });
Contract.hasMany(job_1.Job, { as: "jobs", foreignKey: "contractId" });
job_1.Job.belongsTo(Contract, {
    as: "contract",
    foreignKey: "contractId",
    targetKey: "id",
});
