import express from 'express';

import {
    getTopPayingClient,
    getMostProfitablePosition,
} from '../../controller/v1/admin.controller';

const adminRouter = express.Router();

adminRouter.get('/best-profession', getMostProfitablePosition);
adminRouter.get('/best-clients', getTopPayingClient);

export default adminRouter;