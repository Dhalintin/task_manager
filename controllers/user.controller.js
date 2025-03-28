const userService = require("../services/user.service");
const { hashPassword, confirmPassword } = require("../utils/password");
const jwt = require("jsonwebtoken");
const blacklistedTokens = require("../middlewares/blacklist.middleware");

class UserController {
    async signup(req, res) {
        try {
            const { email, username, firstname, lastname, password } = req.body;

            // Check if email has already been used and returning an error to prevent duplicate use of email
            const existingUser = await userService.getUser(email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "This email has already been used by another user",
                });
            }

            // Hashing the password
            const hashedPass = await hashPassword(password);

            // Singup new user
            const newUser = await userService.signup({
                firstname,
                lastname,
                username,
                email,
                password: hashedPass,
            });

            // If signup fails through error
            if (!newUser) {
                return res.status(500).json({
                    success: false,
                    message: "Registration failed!",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Successful!",
                data: newUser,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                wahala: "dey",
                message: error.message,
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.getUser(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Authentication failed",
                });
            }

            console.log(user.password);

            const isVerified = await confirmPassword(password, user.password);
            console.log(isVerified);

            if (!isVerified) {
                return res.status(401).json({
                    success: false,
                    message: "Authentications failed!",
                });
            }

            const token = jwt.sign(
                {
                    email: user.email,
                    userId: user._id,
                    username: user.username,
                    role: user.role,
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "24h",
                }
            );

            return res.status(200).json({
                success: true,
                message: "Successful!",
                data: user,
                token,
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }

    async logout(req, res) {
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                return res.status(400).json({ message: "No token provided" });
            }

            const decoded = jwt.verify(token, process.env.JWT_KEY);

            const expTime = decoded.exp - Math.floor(Date.now() / 1000);

            if (expTime > 0) blacklistedTokens.add(token);

            return res
                .status(200)
                .json({ success: true, message: "Successfully logged out" });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new UserController();
