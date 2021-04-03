const Joi = require('joi');

const JoiName     = Joi.string().pattern(/^([A-Za-z]\s*)+$/).trim().max(30);
const JoiLastName = Joi.string().pattern(/^([A-Za-z]\s*)+$/).trim().max(50);
const JoiEmail    = Joi.string().email({ tlds: { allow: ['net', 'com'] } }).trim().max(50);
const JoiPassword = Joi.string().pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{10,30}$/).trim();

const userCreateModel = Joi.object({
    name:     JoiName.required(),
    lastName: JoiLastName.required(),
    email:    JoiEmail.required(),
    password: JoiPassword.required(),
});

module.exports = {
    userCreateModel,
}