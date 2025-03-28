const Joi = require("joi");

const signupSchemaValidation = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).required(),
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    password: Joi.string()
        .min(8)
        .required()
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        ),
});

const loginSchemaValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .required()
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        ),
});

module.exports = { signupSchemaValidation, loginSchemaValidation };
