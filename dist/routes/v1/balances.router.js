"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const balances_controller_1 = require("../../controller/v1/balances.controller");
const balanceValidators_1 = require("../../validators/balanceValidators");
const balancesRouter = express_1.default.Router();
balancesRouter.post('/deposit/:id', balanceValidators_1.validateDepositRequest, balances_controller_1.deposit);
exports.default = balancesRouter;
//# sourceMappingURL=balances.router.js.map