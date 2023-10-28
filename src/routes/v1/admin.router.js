const express = require('express');

const {
    getTopPayingClient,
    getMostProfitablePosition,
} = require('../../controller/v1/admin.controller');

const adminRouter = express.Router();

adminRouter.get('/best-profession', getMostProfitablePosition);
adminRouter.get('/best-clients', getTopPayingClient);

module.exports = adminRouter;