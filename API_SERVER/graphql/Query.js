const UserService = require('../services/UserService');
const TaskService = require('../services/TaskService');
const userService = new UserService();
const taskService = new TaskService();

const getUser = async (root, args, { user: { userId } }) => {
    return await userService.getUser({ userId });
}

const getTaskById = async (root, { taskId }, { user: { userId } }) => {
    return await taskService.getTaskById({ userId, taskId });
}

const getTaskListByUser = async (root, args, { user: { userId } }) => {
    return await taskService.getTaskListByUser({ userId });
}

const Query = {
    getUser,
    getTaskById,
    getTaskListByUser,
}

module.exports = {
    Query,
}