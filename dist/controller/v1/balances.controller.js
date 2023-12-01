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
exports.deposit = void 0;
const sequelize_1 = require("sequelize");
const response_1 = require("../../utils/response");
const contract_1 = require("../../utils/constants/contract");
const sequelize_2 = require("../../models/sequelize");
const contract_2 = require("../../models/contract");
const job_1 = require("../../models/job");
const profile_1 = require("../../models/profile");
function deposit(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        if (req.profile && req.profile.type !== contract_1.PROFILE_TYPES.CLIENT) {
            return res.status(403).json((0, response_1.formatError)('Operation not allowed'));
        }
        const profileId = (_a = req.profile) === null || _a === void 0 ? void 0 : _a.id;
        const balance = ((_b = req.profile) === null || _b === void 0 ? void 0 : _b.balance) || 0;
        const depositAmount = req.body.depositAmount;
        const transaction = yield sequelize_2.sequelize.transaction();
        try {
            const totalPrice = yield job_1.Job.findAll({
                attributes: [[sequelize_1.Sequelize.literal('SUM(job.price)'), 'total']],
                where: {
                    paid: false,
                },
                include: [
                    {
                        model: contract_2.Contract,
                        as: 'contract',
                        where: {
                            clientId: profileId,
                            status: contract_1.CONTRACT_STATUSES.IN_PROGRES,
                        },
                        attributes: []
                    }
                ],
            });
            const maxDeposit = (totalPrice[0].dataValues.total * 25 / 100);
            const isDepositMoreThan25PrcentOfJobsToPay = (totalPrice[0].dataValues.total * 25 / 100) < depositAmount;
            if (isDepositMoreThan25PrcentOfJobsToPay) {
                yield transaction.rollback();
                return res.status(403).json((0, response_1.formatError)(`You can deposit max ${maxDeposit.toFixed(2)} as it shouldn't be more than 25% of current unpaied jobs.`));
            }
            const newBalance = Number((balance + depositAmount).toFixed(2));
            profile_1.Profile.update({ balance: newBalance }, { where: { id: profileId } });
            yield transaction.commit();
            return res.json((0, response_1.formatResponse)(Object.assign(Object.assign({}, (_c = req.profile) === null || _c === void 0 ? void 0 : _c.dataValues), { balance: newBalance })));
        }
        catch (error) {
            console.error(error);
            yield transaction.rollback();
            return res.status(500).json((0, response_1.formatError)('Something went wrong', [error]));
        }
    });
}
exports.deposit = deposit;
