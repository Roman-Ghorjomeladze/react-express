"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getTopPayingClient = exports.getMostProfitablePosition = void 0;
const sequelize_1 = require("sequelize");
const response_1 = require("../../utils/response");
const contract_1 = require("../../utils/constants/contract");
const admin_qb_1 = require("../../utils/queryBuilders/admin.qb");
const general_1 = require("../../utils/general");
const contract_2 = require("../../models/contract");
const job_1 = require("../../models/job");
const profile_1 = require("../../models/profile");
function getMostProfitablePosition(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const whereClaus = (0, admin_qb_1.buildTopPayingWhereClause)(req.query);
            const result = yield profile_1.Profile.findAll({
                attributes: ['profession', [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('contractor->jobs.price')), 'amount']],
                include: [
                    {
                        model: contract_2.Contract,
                        as: 'contractor',
                        attributes: [],
                        where: { status: contract_1.CONTRACT_STATUSES.IN_PROGRES },
                        include: [
                            {
                                model: job_1.Job,
                                as: 'jobs',
                                attributes: [],
                                where: whereClaus
                            },
                        ],
                    },
                ],
                order: [['amount', 'DESC']],
            });
            return res.json((0, response_1.formatResponse)(result.length > 0 ? result[0] : null));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.formatError)('Something went wrong'));
        }
    });
}
exports.getMostProfitablePosition = getMostProfitablePosition;
function getTopPayingClient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const whereClaus = (0, admin_qb_1.buildTopPayingWhereClause)(req.query);
            const pagination = (0, general_1.getPaginationParams)(req.query, 2);
            const results = yield profile_1.Profile.findAll({
                attributes: [
                    'id',
                    [sequelize_1.Sequelize.literal("SUM(price)"), 'totalCost'],
                    [sequelize_1.Sequelize.literal("firstName || ' ' || lastName"), 'name'],
                ],
                include: [
                    {
                        model: contract_2.Contract,
                        as: 'client',
                        attributes: [],
                        include: [
                            {
                                model: job_1.Job,
                                as: 'jobs',
                                attributes: [],
                                where: whereClaus,
                            },
                        ],
                    },
                ],
                where: {
                    type: contract_1.PROFILE_TYPES.CLIENT,
                },
                group: ['profile.id', 'name'],
                having: sequelize_1.Sequelize.literal('SUM(price) IS NOT NULL'),
                order: [[sequelize_1.Sequelize.literal('SUM(price)'), 'DESC']],
                limit: pagination.limit,
                offset: pagination.offset,
                subQuery: false,
            });
            return res.json((0, response_1.formatResponse)(results));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.formatError)('Something went wrong'));
        }
    });
}
exports.getTopPayingClient = getTopPayingClient;
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield profile_1.Profile.findAll({ attributes: ['firstName', 'lastName', 'id'] });
        return res.json((0, response_1.formatResponse)(users));
    });
}
exports.getUsers = getUsers;
