const express = require('express');

const {
    getContract, 
    getContracts
} = require('../../controller/v1/contracts.controller');


const contractsRouter = express.Router();

contractsRouter.get('/', getContracts);
contractsRouter.get('/:id', getContract);

module.exports = contractsRouter;