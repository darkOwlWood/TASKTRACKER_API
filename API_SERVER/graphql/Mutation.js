const TaskService = require('../services/TaskService');
const taskService = new TaskService();

const addTask = async (root, { task }, { user: { userId } }) => {
    return await taskService.addTask({ userId, task });
}

const updateTask = async (root, { taskId, task }, { user: { userId } }) => {
    return await taskService.updateTask({ userId, taskId, task });
}

const deleteTask = async (root, { taskId }, { user: { userId } }) => {
    return await taskService.deleteTask({ userId, taskId });
}

const Mutation = {
    addTask,
    updateTask,
    deleteTask,
}

module.exports = {
    Mutation,
}