const {body, validationResult} = require('express-validator');
const { formatError } = require('../utils/response');


const validateDepositRequest = [
    body('depositAmount')
        .notEmpty().withMessage("depositAmount shouldn't be empty")
        .isNumeric().withMessage("depositAmount should be valid number")
        .custom((value) => value > 0).withMessage("depositAmount should be more than 0"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(formatError('Invalid request', errors.array()))
        }
        next();
    }
];

module.exports = {validateDepositRequest}