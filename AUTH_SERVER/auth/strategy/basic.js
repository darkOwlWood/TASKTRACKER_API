const boom = require('@hapi/boom');
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const UserService = require('../../user/UserService');
const userService = new UserService();

passport.use(new BasicStrategy(
    async (email, password, done) => {
        try {
            (await userService.passwordMatch({ email, password })) ? done(null, { email }) : done(boom.unauthorized());
        } catch (err) {
            done(err, false);
        }
    }
));