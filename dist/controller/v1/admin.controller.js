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
const models_1 = require("../../models");
const contract_1 = require("../../utils/constants/contract");
const admin_queryBuilder_1 = require("../../utils/queryBuilders/admin.queryBuilder");
const general_1 = require("../../utils/general");
function getMostProfitablePosition(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const whereClaus = (0, admin_queryBuilder_1.buildTopPayingWhereClause)(req.query);
            const result = yield models_1.Profile.findAll({
                attributes: ['profession', [sequelize_1.Sequelize.fn('SUM', sequelize_1.Sequelize.col('Contractor->Jobs.price')), 'amount']],
                include: [
                    {
                        model: models_1.Contract,
                        as: 'Contractor',
                        attributes: [],
                        where: { status: contract_1.CONTRACT_STATUSES.IN_PROGGRESS },
                        include: [
                            {
                                model: models_1.Job,
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
            console.log(error);
            res.status(500).json((0, response_1.formatError)('Something went wrong'));
        }
    });
}
exports.getMostProfitablePosition = getMostProfitablePosition;
function getTopPayingClient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const whereClaus = (0, admin_queryBuilder_1.buildTopPayingWhereClause)(req.query);
            const pagination = (0, general_1.getPaginationParams)(req.query, 2);
            const results = yield models_1.Profile.findAll({
                attributes: [
                    'id',
                    [sequelize_1.Sequelize.literal("SUM(price)"), 'totalCost'],
                    [sequelize_1.Sequelize.literal("firstName || ' ' || lastName"), 'name'],
                ],
                include: [
                    {
                        model: models_1.Contract,
                        as: 'Client',
                        attributes: [],
                        include: [
                            {
                                model: models_1.Job,
                                as: 'Jobs',
                                attributes: [],
                                where: whereClaus,
                            },
                        ],
                    },
                ],
                where: {
                    type: 'client',
                },
                group: ['Profile.id', 'name'],
                having: sequelize_1.Sequelize.literal('totalCost IS NOT NULL'),
                order: [[sequelize_1.Sequelize.literal('totalCost'), 'DESC']],
                limit: pagination.limit,
                offset: pagination.offset,
                subQuery: false,
            });
            return res.json((0, response_1.formatResponse)(results));
        }
        catch (error) {
            res.status(500).json((0, response_1.formatError)('Something went wrong'));
        }
    });
}
exports.getTopPayingClient = getTopPayingClient;
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield models_1.Profile.findAll({ attributes: ['firstName', 'lastName', 'id'] });
        return res.json((0, response_1.formatResponse)(users));
    });
}
exports.getUsers = getUsers;
//# sourceMappingURL=admin.controller.js.map