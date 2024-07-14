"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatCompValidator = exports.signupValidator = exports.loginValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty) {
                break;
            }
            const error = (0, express_validator_1.validationResult)(req);
            if (error.isEmpty()) {
                return next();
            }
            return res.status(422).json({ error: error.array() });
        }
    };
};
exports.validate = validate;
exports.loginValidator = [
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("Email is required"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should contain at least 6 characters"),
];
exports.signupValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    ...exports.loginValidator,
];
exports.chatCompValidator = [
    (0, express_validator_1.body)("message").notEmpty().withMessage("Message is required"),
];
