"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const sequelize_1 = require("./sequelize");
const sequelize_2 = require("sequelize");
class Job extends sequelize_2.Model {
}
exports.Job = Job;
Job.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: sequelize_2.DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: sequelize_2.DataTypes.DECIMAL(12, 2),
        allowNull: false,
    },
    paid: {
        type: sequelize_2.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    paymentDate: {
        type: sequelize_2.DataTypes.DATE,
    },
}, {
    sequelize: sequelize_1.sequelize,
    modelName: "job",
});
