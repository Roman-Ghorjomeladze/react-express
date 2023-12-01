"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = exports.formatResponse = void 0;
const formatResponse = (data, meta) => {
    return meta ? { data, meta, ok: true } : { data, ok: true };
};
exports.formatResponse = formatResponse;
const formatError = (message, errors = []) => {
    return {
        data: null,
        error: {
            message,
            details: errors,
        },
        ok: false,
    };
};
exports.formatError = formatError;
