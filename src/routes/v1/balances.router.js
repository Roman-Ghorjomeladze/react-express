const express = require('express');

const { deposit } = require('../../controller/v1/balances.controller');
const { validateDepositRequest } = require('../../validators/balanceValidators');


const balancesRouter = express.Router();

balancesRouter.post('/deposit/:id', validateDepositRequest, deposit)

module.exports = balancesRouter;