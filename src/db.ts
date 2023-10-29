import { Sequelize } from "sequelize-typescript";
import { Job, Profile, Contract } from "./models";
const connection = new Sequelize({
    // dialect: "mariadb",
    // host: "localhost",
    // username: "root",
    // password: "root",
    // database: "sequelize",
    dialect: 'sqlite',
    storage: './database.sqlite3',
    logging: true,
    models: [Job, Profile, Contract],
});

export default connection;