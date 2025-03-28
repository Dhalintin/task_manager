const jwt = require("jsonwebtoken");
const blacklistedTokens = require("./blacklist.middleware");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (blacklistedTokens.has(token)) {
            return res.status(401).json({ message: "Token is blacklisted" });
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: error,
        });
    }
};
