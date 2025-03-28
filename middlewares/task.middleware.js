const taskValidationSchema = require("../validations/task.validation");

module.exports = (req, res, next) => {
    const { error } = taskValidationSchema.validate(req.body);
    if (error) {
        let errorMessage = error.message.replace(/"/g, "");
        errorMessage =
            errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
        return res.status(401).json({
            message: errorMessage,
        });
    } else {
        next();
    }
};
