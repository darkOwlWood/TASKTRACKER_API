const { handlerValidateModel } = require('../utils/middleware/handlerValidateModel');
const { TaskId, TaskInput } = require('../models/TaskModel');

const resolversComposition = {
    'Query.getTaskById':   [handlerValidateModel(TaskId, 'taskId')],
    'Mutation.addTask':    [handlerValidateModel(TaskInput, 'task')],
    'Mutation.updateTask': [handlerValidateModel(TaskId, 'taskId'),handlerValidateModel(TaskInput, 'task')],
    'Mutation.deleteTask': [handlerValidateModel(TaskId, 'taskId')],
}

module.exports = {
    resolversComposition,
}