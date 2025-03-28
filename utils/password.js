const bcrypt = require("bcryptjs");

const saltRounds = process.env.SALTROUNDS;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hash = await bcrypt.hash(password, salt); // Hash password
        return hash;
    } catch (err) {
        throw new Error("Error hashing password");
    }
};

const confirmPassword = async (password, hash) => {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (err) {
        throw new Error("Error comparing passwords");
    }
};

module.exports = { hashPassword, confirmPassword };
