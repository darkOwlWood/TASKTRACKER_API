const Joi = require('joi');

const Joi_id         = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);
const JoiTitle       = Joi.string().max(50);
const JoiDescription = Joi.string().max(300);
const JoiComplete    = Joi.number().integer().min(0).max(1);
const JoiIssueDate   = Joi.date();
const JoiDueDate     = Joi.date();

const TaskId = Joi.object({
    taskId: Joi_id.required(),
});

const TaskInput = Joi.object({
    title:       JoiTitle.required(),
    description: JoiDescription.required(),
    complete:    JoiComplete.required(),
    issueDate:   JoiIssueDate.required(),
    dueDate:     JoiDueDate.required(),
});

module.exports = {
    TaskId,
    TaskInput,
}