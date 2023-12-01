"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const contract_1 = require("../utils/constants/contract");
const sequelize_1 = require("./sequelize");
const sequelize_2 = require("sequelize");
class Profile extends sequelize_2.Model {
}
exports.Profile = Profile;
Profile.init({
    id: {
        type: sequelize_2.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    profession: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    balance: {
        type: sequelize_2.DataTypes.DECIMAL(12, 2),
    },
    type: {
        type: sequelize_2.DataTypes.ENUM(...Object.values(contract_1.PROFILE_TYPES)),
    },
}, {
    sequelize: sequelize_1.sequelize,
    modelName: "profile",
});
