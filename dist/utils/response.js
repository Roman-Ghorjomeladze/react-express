"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = exports.formatResponse = void 0;
/*
    To ensure that response will always be an object with the same structure, we can use such handler
    Also it's handy when working api's with pagination, we can add meta key in response and set pagination data in it
*/
const formatResponse = (data, meta) => {
    return meta ? { data, meta, ok: true } : { data, ok: true };
};
exports.formatResponse = formatResponse;
/*
    For consistency I always prefer not to change response structure, that's why I'm returning
    an array of error texts. So if there will be multiple errors, I'll include them in this array
*/
const formatError = (message, errors = []) => {
    return {
        data: null,
        error: {
            message,
            details: errors,
        },
        ok: false
    };
};
exports.formatError = formatError;
//# sourceMappingURL=response.js.map