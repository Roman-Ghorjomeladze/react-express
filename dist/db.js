"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const models_1 = require("./models");
const connection = new sequelize_typescript_1.Sequelize({
    // dialect: "mariadb",
    // host: "localhost",
    // username: "root",
    // password: "root",
    // database: "sequelize",
    dialect: 'sqlite',
    storage: './database.sqlite3',
    logging: true,
    models: [models_1.Job, models_1.Profile, models_1.Contract],
});
exports.default = connection;
//# sourceMappingURL=db.js.map