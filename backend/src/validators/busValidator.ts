// src/validators/busValidator.ts
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Валидация за POST / PUT
export const busValidationRules = [
    body("number")
        .isString().withMessage("number must be a string")
        .notEmpty().withMessage("number is required"),
    body("carrier")
        .isString().withMessage("carrier must be a string")
        .notEmpty().withMessage("carrier is required"),
    body("capacity")
        .isInt({ min: 1 }).withMessage("capacity must be an integer ≥1"),
    body("isActive")
        .isBoolean().withMessage("isActive must be true or false"),
];

// Middleware за проверка на резултатите
export function validateBus(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
