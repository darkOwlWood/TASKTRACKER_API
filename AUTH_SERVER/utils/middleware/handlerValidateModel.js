const boom = require('@hapi/boom');

const handlerValidateModel = (model, check = 'body') => (req, res, next) => {
    const { error } = model.validate(req[check]);
    next(error ? boom.badRequest(error) : undefined);
}

module.exports = {
    handlerValidateModel,
}