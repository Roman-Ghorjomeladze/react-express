"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../../controller/v1/admin.controller");
const adminRouter = express_1.default.Router();
adminRouter.get('/best-profession', admin_controller_1.getMostProfitablePosition);
adminRouter.get('/best-clients', admin_controller_1.getTopPayingClient);
exports.default = adminRouter;
