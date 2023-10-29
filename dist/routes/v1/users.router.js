"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../../controller/v1/users.controller");
const userRouter = express_1.default.Router();
userRouter.get('/', users_controller_1.getUsers);
userRouter.get('/me', users_controller_1.me);
exports.default = userRouter;
//# sourceMappingURL=users.router.js.map