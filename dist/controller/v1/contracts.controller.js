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
exports.getContracts = exports.getContract = void 0;
const sequelize_1 = require("sequelize");
const response_1 = require("../../utils/response");
const models_1 = require("../../models");
const contract_1 = require("../../utils/constants/contract");
function getContract(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contract = yield models_1.Contract.findOne({
                where: {
                    [sequelize_1.Op.or]: {
                        ContractorId: req.profile.id,
                        ClientId: req.profile.id,
                    },
                    id: req.params.id
                }
            });
            if (!contract)
                return res.status(404).json((0, response_1.formatError)('Contract not found'));
            return res.json((0, response_1.formatResponse)(contract));
        }
        catch (error) {
            res.status(500).json((0, response_1.formatError)('Something went wrong'));
        }
    });
}
exports.getContract = getContract;
function getContracts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contracts = yield models_1.Contract.findAll({
                where: {
                    [sequelize_1.Op.or]: {
                        ContractorId: req.profile.id,
                        ClientId: req.profile.id,
                    },
                    status: { [sequelize_1.Op.not]: contract_1.CONTRACT_STATUSES.TERMINATED }
                }
            });
            return res.json((0, response_1.formatResponse)(contracts));
        }
        catch (error) {
            res.status(500).json((0, response_1.formatError)('Something went wrong'));
        }
    });
}
exports.getContracts = getContracts;
//# sourceMappingURL=contracts.controller.js.map