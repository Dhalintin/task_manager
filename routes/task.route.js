const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/user.auth");
const taskController = require("../controllers/task.controller");
const taskValidationSchema = require("../middlewares/task.middleware");
const roleAuth = require("../middlewares/role.auth");
const adminTaskController = require("../controllers/adminTask.controller");

router
    .route("/")
    .post(authenticateUser, taskValidationSchema, taskController.create)
    .get(authenticateUser, taskController.getAll);

router.get("/search/:key", authenticateUser, taskController.search);

router
    .route("/:id")
    .get(authenticateUser, taskController.getByID)
    .patch(authenticateUser, taskController.update)
    .delete(authenticateUser, taskController.delete);

router
    .route("/admin")
    .get(
        authenticateUser,
        roleAuth(["Admin"]),
        adminTaskController.getAllTasks
    );

router
    .route("/admin/:id")
    .get(authenticateUser, roleAuth(["Admin"]), adminTaskController.getByID)
    .patch(authenticateUser, roleAuth(["Admin"]), adminTaskController.update)
    .delete(authenticateUser, roleAuth(["Admin"]), adminTaskController.delete);

router.get(
    "/admin/:id",
    authenticateUser,
    roleAuth(["Admin"]),
    adminTaskController.taskersTask
);

module.exports = router;
