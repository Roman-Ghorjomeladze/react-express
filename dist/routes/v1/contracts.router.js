"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contracts_controller_1 = require("../../controller/v1/contracts.controller");
const contractsRouter = express_1.default.Router();
contractsRouter.get('/', contracts_controller_1.getContracts);
contractsRouter.get('/:id', contracts_controller_1.getContract);
exports.default = contractsRouter;
