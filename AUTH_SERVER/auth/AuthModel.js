const Joi = require('joi');

const JoiChallange     = Joi.string().pattern(/^([0-9a-fA-F]{40})$/);
const JoiHashChallange = Joi.string().pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4}\#([0-9a-zA-Z]|\.|\/|\$){60})$/);

const AuthChallange = Joi.object({
    challange: JoiChallange.required(),
});

const AuthHashChallange = Joi.object({
    hashChallange: JoiHashChallange.required(),
});

module.exports = {
    AuthChallange,
    AuthHashChallange,
}