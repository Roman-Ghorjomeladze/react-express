"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationParams = exports.isDateValid = void 0;
function isDateValid(dateString) {
    const date = new Date(dateString);
    return !isNaN(Number(date)) ? date : null;
}
exports.isDateValid = isDateValid;
function getPaginationParams(params, defaultLimit = 20) {
    const limit = params.limit || defaultLimit;
    return {
        limit,
        offset: params.page ? (params.page - 1) * limit : 0,
        page: params.page || 1,
    };
}
exports.getPaginationParams = getPaginationParams;
