import express from 'express';

import {
    me,
    getUsers
}  from '../../controller/v1/users.controller';

const userRouter = express.Router();


userRouter.get('/profiles', getUsers);
userRouter.get('/me', me);

export default userRouter;