import express from 'express';

import { deposit } from '../../controller/v1/balances.controller';
import { validateDepositRequest } from '../../validators/balanceValidators';


const balancesRouter = express.Router();

balancesRouter.post('/deposit/:id', validateDepositRequest, deposit)

export default balancesRouter;