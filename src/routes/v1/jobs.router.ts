import express from "express";

import {
    payJob,
    getUnpayedJobs,
} from "../../controller/v1/jobs.controller";


const jobsRouter = express.Router();

jobsRouter.get("/unpaid", getUnpayedJobs);
jobsRouter.post("/:id/pay", payJob);    

export default jobsRouter;
