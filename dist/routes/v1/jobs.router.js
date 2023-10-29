"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobs_controller_1 = require("../../controller/v1/jobs.controller");
const jobsRouter = express_1.default.Router();
jobsRouter.get("/unpaid", jobs_controller_1.getUnpayedJobs);
jobsRouter.post("/:id/pay", jobs_controller_1.payJob);
exports.default = jobsRouter;
//# sourceMappingURL=jobs.router.js.map