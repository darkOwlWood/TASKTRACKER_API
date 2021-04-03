const TaskService = require('../services/TaskService');
const taskService = new TaskService();

const User = {
    _id:      root => root._id,
    name:     root => root.name,
    lastName: root => root.lastName,
    email:    root => root.email,
    taskList: async root => {
        const list = await taskService.getTaskListByUser({ userId: root._id });
        return list;
    }
}

const Types = {
    User,
}

module.exports = {
    Types,
}