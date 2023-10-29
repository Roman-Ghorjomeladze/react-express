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
exports.deposit = void 0;
const sequelize_1 = require("sequelize");
const response_1 = require("../../utils/response");
const models_1 = require("../../models");
const db_1 = __importDefault(require("../../db"));
const contract_1 = require("../../utils/constants/contract");
function deposit(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.profile.type !== contract_1.PROFILE_TYPES.CLIENT) {
            return res.status(403).json((0, response_1.formatError)('Operation not allowed'));
        }
        const depositAmount = req.body.depositAmount;
        const transaction = yield db_1.default.transaction();
        try {
            if (req.profile.balance < depositAmount) {
                yield transaction.rollback();
                return res.status(400).json((0, response_1.formatError)("You don't have enough money on balance to deposit such amount"));
            }
            const contractor = yield models_1.Profile.findOne({
                where: { id: req.params.id },
            });
            if (!contractor || contractor.type !== contract_1.PROFILE_TYPES.CONTRACTOR) {
                yield transaction.rollback();
                return res.status(403).json((0, response_1.formatError)('Operation not allowed'));
            }
            const contract = models_1.Contract.findOne({
                where: {
                    ClientId: req.profile.id,
                    ContractorId: contractor.id
                }
            });
            if (!contract) {
                yield transaction.rollback();
                return res.status(403).json((0, response_1.formatError)(`You don't have common contract with the candidate`));
            }
            const myContracts = yield models_1.Contract.findAll({
                attributes: [[sequelize_1.Sequelize.literal("SUM(Jobs.price)"), 'totalAmount']],
                where: { ClientId: req.profile.id },
                include: [
                    {
                        model: models_1.Job,
                        where: {
                            paid: false
                        },
                        attributes: []
                    }
                ]
            });
            if (myContracts.length === 0 || !myContracts[0].dataValues.totalAmount) {
                yield transaction.rollback();
                return res.status(403).json((0, response_1.formatError)(`You can't deposit, untill you have no jobs to pay`));
            }
            const isDepositMoreThan25PrcentOfJobsToPay = (myContracts[0].dataValues.totalAmount * 25 / 100) < depositAmount;
            if (isDepositMoreThan25PrcentOfJobsToPay) {
                yield transaction.rollback();
                return res.status(403).json((0, response_1.formatError)(`The amount of deposit shouldn't be more that 25 % of current unpaied jobs.`));
            }
            const contractorsNewBalance = Number((contractor.balance + depositAmount).toFixed(2));
            const clientsNewBalance = Number((req.profile.balance - depositAmount).toFixed(2));
            models_1.Profile.update({ balance: contractorsNewBalance }, { where: { id: contractor.id } });
            models_1.Profile.update({ balance: clientsNewBalance }, { where: { id: req.profile.id } });
            yield transaction.commit();
            return res.json((0, response_1.formatResponse)(Object.assign(Object.assign({}, req.profile.dataValues), { balance: clientsNewBalance })));
        }
        catch (error) {
            console.log(error);
            yield transaction.rollback();
            res.status(500).json((0, response_1.formatError)('Something went wrong', error));
        }
    });
}
exports.deposit = deposit;
//# sourceMappingURL=balances.controller.js.map