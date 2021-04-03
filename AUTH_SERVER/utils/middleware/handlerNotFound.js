const boom = require('@hapi/boom');

const handlerNotFound = (req, res, next) => {
    const { message, output: { statusCode } } = boom.notFound();
    res.status(statusCode).json({ errors: [{ message, statusCode }] });
}

module.exports = {
    handlerNotFound,
}