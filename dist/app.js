"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.set('sequelize', db_1.default);
app.set('models', db_1.default.models);
app.use(express_1.default.static((0, path_1.join)(__dirname, '../', 'client', 'build')));
app.use('/api', api_1.default);
app.get('/*', (req, res) => {
    res.sendFile((0, path_1.join)(__dirname, '../', 'client', 'build', 'index.html'));
});
exports.default = app;
//# sourceMappingURL=app.js.map