const taskService = require("../services/task.service");

class TaskController {
    async create(req, res) {
        try {
            const userId = req.user.userId;

            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: "Please login to create task!",
                });
            }

            const { title, description, priority, status, dueDate } = req.body;

            const newTask = await taskService.createTask({
                title,
                description,
                priority,
                status,
                dueDate,
                owner: userId,
            });

            if (!newTask) {
                return res.status(500).json({
                    success: false,
                    message: "Task creation failed!",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Successful!",
                data: newTask,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getAll(req, res) {
        try {
            const userId = req.user.userId;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Please log in to see tasks",
                });
            }

            const filter = req.query;

            const tasks = await taskService.getAllTasks(filter, userId);

            if (!tasks) {
                return res.status(500).json({
                    success: false,
                    message: "No task found!",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Successful!",
                data: tasks,
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }

    async search(req, res) {
        try {
            const userId = req.user.userId;
            const keyWord = req.params.key;

            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: "Please log in to see tasks",
                });
            }

            const filter = req.query;

            const tasks = await taskService.search(keyWord, filter, userId);

            if (!tasks) {
                return res.status(500).json({
                    success: false,
                    message: "No task found!",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Successful!",
                data: tasks,
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getAllTasks(req, res) {
        try {
            const filter = req.body.filter;

            const tasks = await taskService.allTasks(filter, userId);

            if (!tasks) {
                return res.status(500).json({
                    success: false,
                    message: "No task found!",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Successful!",
                data: tasks,
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getByID(req, res) {
        try {
            const taskId = req.params.id;

            const task = await taskService.getTaskById(taskId);

            if (!task) {
                return res.status(401).json({
                    success: false,
                    message: "Task doesn't exist!",
                });
            }

            const userId = req.user._id;

            if (task.owner._id !== userId && task?.assigned?._id !== userId) {
                return res.status(401).json({
                    success: false,
                    message: "Authorized access!",
                });
            }

            return res
                .status(200)
                .json({ success: true, message: "Successfully!", data: task });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const taskId = req.params.id;

            const userId = req.user.userId;

            const updatedTask = await taskService.updateTask(
                taskId,
                req.body,
                userId
            );

            if (!updatedTask) {
                return res.status(401).json({
                    success: false,
                    message: "Task update failed!",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Updated successfully!",
                data: updatedTask,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async delete(req, res) {
        try {
            const taskId = req.params.id;

            const userId = req.user._id;

            const updatedTask = await taskService.deleteTask(taskId, userId);

            if (!updatedTask) {
                return res.status(401).json({
                    success: false,
                    message: "Task deletion failed!",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Deleted successfully!",
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}

module.exports = new TaskController();
