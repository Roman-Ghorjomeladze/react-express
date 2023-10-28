const express = require("express");

const {
    payJob,
    getUnpayedJobs,
} = require("../../controller/v1/jobs.controller");


const jobsRouter = express.Router();

jobsRouter.get("/unpaid", getUnpayedJobs);
jobsRouter.post("/:id/pay", payJob);    

module.exports = jobsRouter;
