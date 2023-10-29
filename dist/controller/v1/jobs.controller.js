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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payJob = exports.getUnpayedJobs = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../../models");
const response_1 = require("../../utils/response");
const contract_1 = require("../../utils/constants/contract");
const db_1 = __importDefault(require("../../db"));
function getUnpayedJobs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jobs = yield models_1.Job.findAll({
                where: {
                    paid: false,
                },
                include: [
                    {
                        model: models_1.Contract,
                        where: {
                            [sequelize_1.Op.or]: {
                                contractorId: req.profile.id,
                                clientId: req.profile.id,
                            },
                            [sequelize_1.Op.and]: {
                                status: contract_1.CONTRACT_STATUSES.IN_PROGGRESS,
                            },
                        },
                        attributes: [],
                    },
                ],
            });
            return res.json((0, response_1.formatResponse)(jobs));
        }
        catch (error) {
            return res.status(500).json((0, response_1.formatError)("Something went wrong"));
        }
    });
}
exports.getUnpayedJobs = getUnpayedJobs;
function payJob(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const transaction = yield db_1.default.transaction();
        try {
            const job = yield models_1.Job.findOne({
                where: {
                    id: req.params.id,
                },
                include: [
                    {
                        model: models_1.Contract,
                        where: {
                            clientId: req.profile.id,
                        },
                        include: [
                            {
                                model: models_1.Profile,
                                as: "Client",
                            },
                            {
                                model: models_1.Profile,
                                as: "Contractor",
                            },
                        ],
                    },
                ],
            });
            if (!job) {
                yield transaction.rollback();
                return res.status(404).json((0, response_1.formatError)("Job not found"));
            }
            // return error if job is already paid
            if (job.paid) {
                yield transaction.rollback();
                return res.status(400).json((0, response_1.formatError)("Job is already paid"));
            }
            const contract = job.Contract;
            const client = job.Contract.Client;
            const contractor = job.Contract.Contractor;
            // Return error if somehow client, contract or contractor does not exists
            if (!contract || !client || !contractor) {
                yield transaction.rollback();
                return res.status(400).json((0, response_1.formatError)("Invalid job"));
            }
            // Return error if client's balance isn't enough to afford the price of the job
            if (client.balance < job.price) {
                yield transaction.rollback();
                return res
                    .status(400)
                    .json((0, response_1.formatError)("You don't have enough money on balance", [
                    { balance: client.balance, jobPrice: job.price },
                ]));
            }
            // Calculate changes of balance for both client and contractor 
            const contractorsNewBalance = Number((contractor.balance + job.price).toFixed(2));
            const clientsNewBalance = Number((client.balance - job.price).toFixed(2));
            models_1.Profile.update({ balance: clientsNewBalance }, { where: { id: client.id } });
            models_1.Profile.update({ balance: contractorsNewBalance }, { where: { id: contractor.id } });
            models_1.Job.update({ paid: true }, { where: { id: job.id } });
            yield transaction.commit();
            job.paid = true;
            job.Contract.Contractor.balance = contractorsNewBalance;
            job.Contract.Client.balance = clientsNewBalance;
            return res.json((0, response_1.formatResponse)(job));
        }
        catch (error) {
            console.log(error);
            yield transaction.rollback();
            return res.status(500).json((0, response_1.formatError)("Something went wrong"));
        }
    });
}
exports.payJob = payJob;
//# sourceMappingURL=jobs.controller.js.map