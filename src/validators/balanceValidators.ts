import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

import { formatError } from "../utils/response";

export const validateDepositRequest = [
  body("depositAmount")
    .notEmpty()
    .withMessage("depositAmount shouldn't be empty")
    .isNumeric()
    .withMessage("depositAmount should be valid number")
    .custom((value) => value > 0)
    .withMessage("depositAmount should be more than 0"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(formatError("Invalid request", errors.array()));
    }
    return next();
  },
];
