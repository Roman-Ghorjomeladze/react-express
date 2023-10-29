"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDepositRequest = void 0;
const express_validator_1 = require("express-validator");
const response_1 = require("../utils/response");
exports.validateDepositRequest = [
    (0, express_validator_1.body)('depositAmount')
        .notEmpty().withMessage("depositAmount shouldn't be empty")
        .isNumeric().withMessage("depositAmount should be valid number")
        .custom((value) => value > 0).withMessage("depositAmount should be more than 0"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json((0, response_1.formatError)('Invalid request', errors.array()));
        }
        next();
    }
];
//# sourceMappingURL=balanceValidators.js.map