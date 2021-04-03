const passport = require('passport');
const express = require('express');
const router = express.Router();
const AuthController = require('./AuthController');
const authController = new AuthController();

const { userCreateModel } = require('../user/UserModel');
const { AuthChallange, AuthHashChallange } = require('./AuthModel');
const { handlerValidateModel } = require('../utils/middleware/handlerValidateModel');
require('../auth/strategy/basic');

const AuthRoute = app => {
    app.use('/auth', router);

    router.post('/signin', handlerValidateModel(userCreateModel),   authController.signin);
    router.post('/login',  handlerValidateModel(AuthChallange),     passport.authenticate('basic', { session: false }), authController.login);
    router.post('/token',  handlerValidateModel(AuthHashChallange), authController.token);
    router.post('/logout', handlerValidateModel(AuthHashChallange), authController.logout);
}

module.exports = {
    AuthRoute,
}