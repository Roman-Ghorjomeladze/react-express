import { getProfile } from "../middleware/getProfile";
import { formatError } from "../utils/response";
import { getAdminProfile } from "../middleware/getAdminProfile";
import jobsRouter from "./v1/jobs.router";
import balancesRouter from "./v1/balances.router";
import contractsRouter from "../routes/v1/contracts.router";
import adminRouter from "./v1/admin.router";
import userRouter from "./v1/users.router";
import { Request, Response } from "express";
import express from "express";

const api = express();

api.use("/v1/contracts", getProfile, contractsRouter);
api.use("/v1/jobs", getProfile, jobsRouter);
api.use("/v1/balance", getProfile, balancesRouter);
api.use("/v1/user", getAdminProfile, userRouter);
api.use("/v1/admin", getAdminProfile, adminRouter);

api.use("/*", (req: Request, res: Response) => {
  res.status(404).json(formatError("No API endpoint found"));
});

export default api;
