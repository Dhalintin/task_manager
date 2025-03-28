const Task = require("../models/task.model");

class TaskService {
    // Create a task
    async createTask(data) {
        return await Task.create(data);
    }

    // Get all tasks with pagination and sorting
    async getAllTasks(
        { page = 1, limit = 10, sort = "createdAt", order = "desc" },
        userId
    ) {
        return await Task.find({ owner: userId })
            .sort({ [sort]: order === "desc" ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(limit);
    }

    async allTasks({
        page = 1,
        limit = 10,
        sort = "createdAt",
        order = "desc",
    }) {
        return await Task.find()
            .sort({ [sort]: order === "desc" ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(limit);
    }

    // Get task by ID
    async getTaskById(taskId) {
        return await Task.findById(taskId)
            .populate("owner")
            .populate("assignedTo");
    }

    // Update a task
    async updateTask(taskId, updates, userId) {
        if (userId) {
            return await Task.findOneAndUpdate(
                { _id: taskId, owner: userId },
                updates,
                { new: true }
            );
        }

        return (updatedTask = await Task.findOneAndUpdate(
            { _id: taskId },
            updates,
            { new: true }
        ));
    }

    // Delete a task
    async deleteTask(taskId, userId) {
        if (userId) {
            return await Task.findOneAndDelete({ _id: taskId, owner: userId });
        }

        return await Task.findOneAndDelete({ _id: taskId });
    }

    // Get tasks assigned to a user
    async getTasksAssignedToUser(userId) {
        return await Task.find({ assignedTo: userId });
    }

    // Get tasks owned by a user
    async getTasksOwnedByUser(userId) {
        return await Task.find({ owner: userId });
    }

    async search(
        query,
        { page = 1, limit = 10, sort = "createdAt", order = "desc" },
        userId
    ) {
        return await Task.find({ title: { $regex: query, $options: "i" } })
            .sort({ [sort]: order === "desc" ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(limit);
    }
}

module.exports = new TaskService();
