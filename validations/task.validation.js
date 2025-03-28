const Joi = require("joi");

const taskValidationSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),

    description: Joi.string().trim().max(500).optional(),

    priority: Joi.string().valid("Low", "Medium", "High").default("Low"),

    status: Joi.string()
        .valid("Pending", "In Progress", "Completed")
        .default("Pending"),
});

module.exports = taskValidationSchema;
