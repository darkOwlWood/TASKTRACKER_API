const boom = require('@hapi/boom');
const { config } = require('../../config');

const generateResponce = ({ message, statusCode, stack }) => config.dev ? { message, statusCode, stack } : { message, statusCode }

const printErrors = ({ message, statusCode, stack }) => {
    console.error(message);
    console.error(statusCode);
    console.error(stack);
}

const wrapError = ({ message, originalError, stack }) => {
    const statusCode = (originalError && originalError.isBoom) ?    
        originalError.output.statusCode
        : boom.badRequest().output.statusCode;

    return { message, statusCode, stack };
}

const handlerError = error => {
    const { message, statusCode, stack } = wrapError(error);
    printErrors({ message, statusCode, stack });
    return generateResponce({ message, statusCode, stack });
}

module.exports = {
    handlerError,
}