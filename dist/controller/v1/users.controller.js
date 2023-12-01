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
const profile_1 = require("../../models/profile");
const user_qb_1 = require("../../utils/queryBuilders/user.qb");
const sequelize_1 = require("sequelize");
function getUsers(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const whereClause = (0, user_qb_1.prepareUserProfilesWhereClaus)(req.query, (_a = req.profile) === null || _a === void 0 ? void 0 : _a.id);
            const users = yield profile_1.Profile.findAll({
                attributes: [
                    'firstName',
                    'lastName',
                    'id',
                    'type',
                    'profession',
                    'balance',
                    [sequelize_1.Sequelize.literal("firstName || ' ' || lastName"), 'name'],
                ],
                where: whereClause,
            });
            return res.json((0, response_1.formatResponse)(users));
        }
        catch (error) {
            console.error(error);
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
