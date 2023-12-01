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
exports.payJob = exports.unPaidJobs = exports.getJobs = void 0;
const sequelize_1 = require("sequelize");
const response_1 = require("../../utils/response");
const contract_1 = require("../../utils/constants/contract");
const contract_2 = require("../../models/contract");
const job_1 = require("../../models/job");
const profile_1 = require("../../models/profile");
const sequelize_2 = require("../../models/sequelize");
function getJobs(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const profileId = (_a = req.profile) === null || _a === void 0 ? void 0 : _a.id;
            let whereClaus = {};
            if (req.query.paid) {
                whereClaus['paid'] = Number(req.query.paid);
            }
            const nestedWhere = {
                [sequelize_1.Op.or]: {
                    contractorId: profileId,
                    clientId: profileId,
                },
                [sequelize_1.Op.and]: {
                    status: contract_1.CONTRACT_STATUSES.IN_PROGRES,
                },
            };
            if (req.query.contractorId && req.query.contractorId !== '0') {
                nestedWhere[sequelize_1.Op.and]['contractorId'] = req.query.contractorId;
            }
            const jobs = yield job_1.Job.findAll({
                where: whereClaus,
                include: [
                    {
                        model: contract_2.Contract,
                        as: 'contract',
                        where: nestedWhere,
                        attributes: [],
                    },
                ],
            });
            return res.json((0, response_1.formatResponse)(jobs));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.formatError)("Something went wrong"));
        }
    });
}
exports.getJobs = getJobs;
function unPaidJobs(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const profileId = (_a = req.profile) === null || _a === void 0 ? void 0 : _a.id;
            const jobs = yield job_1.Job.findAll({
                where: { paid: 0 },
                include: [
                    {
                        model: contract_2.Contract,
                        as: 'contract',
                        where: {
                            [sequelize_1.Op.or]: {
                                contractorId: profileId,
                                clientId: profileId,
                            },
                            [sequelize_1.Op.and]: {
                                status: contract_1.CONTRACT_STATUSES.IN_PROGRES,
                            },
                        },
                        attributes: [],
                    },
                ],
            });
            return res.json((0, response_1.formatResponse)(jobs));
        }
        catch (error) {
            console.error(error);
            return res.status(500).json((0, response_1.formatError)("Something went wrong"));
        }
    });
}
exports.unPaidJobs = unPaidJobs;
function payJob(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield sequelize_2.sequelize.transaction();
        try {
            const profileId = (_a = req.profile) === null || _a === void 0 ? void 0 : _a.id;
            const job = yield job_1.Job.findOne({
                where: {
                    id: req.params.id,
                },
                include: [
                    {
                        model: contract_2.Contract,
                        as: 'contract',
                        where: {
                            clientId: profileId,
                        },
                        include: [
                            {
                                model: profile_1.Profile,
                                as: "client",
                            },
                            {
                                model: profile_1.Profile,
                                as: "contractor",
                            },
                        ],
                    },
                ],
            });
            if (!job) {
                yield transaction.rollback();
                return res.status(404).json((0, response_1.formatError)("Job not found"));
            }
            if (job.paid) {
                yield transaction.rollback();
                return res.status(400).json((0, response_1.formatError)("Job is already paid"));
            }
            const contract = job.contract;
            const client = (_b = job.contract) === null || _b === void 0 ? void 0 : _b.client;
            const contractor = (_c = job.contract) === null || _c === void 0 ? void 0 : _c.contractor;
            if (!contract || !client || !contractor) {
                yield transaction.rollback();
                return res.status(400).json((0, response_1.formatError)("Invalid job"));
            }
            if (client.balance < job.price) {
                yield transaction.rollback();
                return res
                    .status(400)
                    .json((0, response_1.formatError)("You don't have enough money on balance", [
                    { balance: client.balance, jobPrice: job.price },
                ]));
            }
            const contractorsNewBalance = Number((contractor.balance + job.price).toFixed(2));
            const clientsNewBalance = Number((client.balance - job.price).toFixed(2));
            profile_1.Profile.update({ balance: clientsNewBalance }, { where: { id: client.id } });
            profile_1.Profile.update({ balance: contractorsNewBalance }, { where: { id: contractor.id } });
            job_1.Job.update({ paid: true, paymentDate: String(new Date()) }, { where: { id: job.id } });
            yield transaction.commit();
            job.paid = true;
            job.paymentDate = String(new Date());
            contractor.balance = contractorsNewBalance;
            client.balance = clientsNewBalance;
            return res.json((0, response_1.formatResponse)(job));
        }
        catch (error) {
            console.error(error);
            yield transaction.rollback();
            return res.status(500).json((0, response_1.formatError)("Something went wrong"));
        }
    });
}
exports.payJob = payJob;
