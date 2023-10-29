"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.getUsers = void 0;
const response_1 = require("../../utils/response");
const models_1 = require("../../models");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield models_1.Profile.findAll({ attributes: ['firstName', 'lastName', 'id', 'type', 'profession', 'balance'] });
            return res.json((0, response_1.formatResponse)(users));
        }
        catch (error) {
            return res.status(500).json((0, response_1.formatError)('Something went wrong'));
        }
    });
}
exports.getUsers = getUsers;
function me(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.json((0, response_1.formatResponse)(req.profile));
        }
        catch (error) {
            return res.status(500).json((0, response_1.formatError)('Something went wrong'));
        }
    });
}
exports.me = me;
//# sourceMappingURL=users.controller.js.map