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
exports.getProfile = void 0;
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Profile } = req.app.get('models');
    const profile = yield Profile.findOne({ where: { id: req.get('profile_id') || 0 } });
    if (!profile)
        return res.status(401).end();
    req.profile = profile;
    next();
});
exports.getProfile = getProfile;
//# sourceMappingURL=getProfile.js.map