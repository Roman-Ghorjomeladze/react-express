const express = require('express');

const {
    me,
    getUsers
} = require('../../controller/v1/users.controller');

const userRouter = express.Router();


userRouter.get('/', getUsers);
userRouter.get('/me', me);

module.exports = userRouter;