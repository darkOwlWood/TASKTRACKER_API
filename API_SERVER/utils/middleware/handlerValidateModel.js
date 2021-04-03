const boom = require('@hapi/boom');

const _throw = error => { throw error };
const prepareModel = (property, args) => typeof args[property] !== 'object' ? { [property]: args[property] } : args[property];

const handlerValidateModel = (model, property) => next => async (root, args, conext, info) => {
    const argsModel = prepareModel(property,args);
    const { error } = model.validate(argsModel);
    error && _throw(boom.badRequest(error));
    return next(root, args, conext, info);
}

module.exports = {
    handlerValidateModel,
}