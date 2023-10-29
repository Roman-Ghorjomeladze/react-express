import express from 'express';

import {
    getContract, 
    getContracts
} from '../../controller/v1/contracts.controller';


const contractsRouter = express.Router();

contractsRouter.get('/', getContracts);
contractsRouter.get('/:id', getContract);

export default contractsRouter;