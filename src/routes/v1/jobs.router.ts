import express from "express";

import {
    payJob,
    getJobs,
    unPaidJobs,
} from "../../controller/v1/jobs.controller";


const jobsRouter = express.Router();

jobsRouter.get("/", getJobs);
jobsRouter.get("/unpaid", unPaidJobs);
jobsRouter.post("/:id/pay", payJob);

export default jobsRouter;
