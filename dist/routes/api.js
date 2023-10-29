"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const getProfile_1 = require("../middleware/getProfile");
const response_1 = require("../utils/response");
const getAdminProfile_1 = require("../middleware/getAdminProfile");
const jobs_router_1 = __importDefault(require("./v1/jobs.router"));
const balances_router_1 = __importDefault(require("./v1/balances.router"));
const contracts_router_1 = __importDefault(require("../routes/v1/contracts.router"));
const admin_router_1 = __importDefault(require("./v1/admin.router"));
const users_router_1 = __importDefault(require("./v1/users.router"));
const api = express();
api.use('/v1/contracts', getProfile_1.getProfile, contracts_router_1.default);
api.use('/v1/jobs', getProfile_1.getProfile, jobs_router_1.default);
api.use('/v1/balance', getProfile_1.getProfile, balances_router_1.default);
api.use('/v1/users', getAdminProfile_1.getAdminProfile, users_router_1.default);
api.use('/v1/admin', getAdminProfile_1.getAdminProfile, admin_router_1.default);
api.use('/*', (req, res) => {
    res.status(404).json((0, response_1.formatError)('No API endpoint found'));
});
exports.default = api;
//# sourceMappingURL=api.js.map