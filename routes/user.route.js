const express = require("express");
const router = express.Router();

const signValidation = require("../middlewares/signup.middleware");
const loginValidation = require("../middlewares/login.middleware");
const userController = require("../controllers/user.controller");
const authenticateUser = require("../middlewares/user.auth");

// Sign up
router.post("/signup", signValidation, userController.signup);

// Log in
router.post("/login", loginValidation, userController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Invalidate the JWT by adding it to a blacklist.
 *     security:
 *       - BearerAuth: []
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized - Invalid token
 */
router.post("/logout", authenticateUser, userController.logout);

module.exports = router;
