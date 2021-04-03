const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../config');
const UserService = require('../../services/UserService');
const userService = new UserService();

passport.use(new Strategy(
    {
        secretOrKey: config.secretJwtAccess,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwtPayload, done) => {
        try {
            (!await userService.getUser({ userId: jwtPayload.userId })) ?
                done(null, false)
                : done(null, { userId: jwtPayload.userId });
        } catch (err) {
            done(err, false);
        }
    }
));