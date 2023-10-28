const express = require('express')

const { getProfile } = require('../middleware/getProfile');
const { formatError } = require('../utils/response');
const { getAdminProfile } = require('../middleware/getAdminProfile');
const jobsRouter = require('./v1/jobs.router');
const balancesRouter = require('./v1/balances.router');
const contractsRouter = require('../routes/v1/contracts.router');
const adminRouter = require('./v1/admin.router');
const userRouter = require('./v1/users.router');


const api = express();

api.use('/v1/contracts', getProfile, contractsRouter);
api.use('/v1/jobs', getProfile, jobsRouter);
api.use('/v1/balance', getProfile, balancesRouter);
api.use('/v1/users', getAdminProfile, userRouter);
api.use('/v1/admin', getAdminProfile, adminRouter);

api.use('/*', (req, res) => {
    res.status(404).json(formatError('No API endpoint found'))
})

module.exports = api;