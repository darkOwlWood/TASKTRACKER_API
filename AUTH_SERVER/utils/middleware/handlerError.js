const boom = require('@hapi/boom');
const { config } = require('../../config');

const generateResponse = ({ message, statusCode, stack }) => config.dev ? { message, statusCode, stack } : { message, statusCode };

const wrapperError = (error, req, res, next) => next(error.isBoom ? error : boom.badImplementation(error));

const printError = (error, req, res, next) => {
    console.error(error);
    next(error);
}

const handlerError = (error, req, res, next) => {
    const { message, output: { statusCode }, stack } = error;
    res.status(statusCode).json({ errors: [generateResponse({ message, statusCode, stack })] });
}

module.exports = {
    wrapperError,
    printError,
    handlerError,
}