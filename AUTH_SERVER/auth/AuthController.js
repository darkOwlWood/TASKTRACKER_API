const AuthService = require('./AuthService');

class AuthController {
    constructor() {
        this.init();
        this.service = new AuthService();
    }

    init() {
        this.signin = this.signin.bind(this);
        this.login = this.login.bind(this);
        this.token = this.token.bind(this);
        this.logout = this.logout.bind(this);
    }

    async signin(req, res, next) {
        const { body: userModel } = req;
        try {
            const userWasInserted = await this.service.signin({ userModel });
            res.status(userWasInserted ? 201 : 409).send();
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        const { user: { email }, body: { challange } } = req;
        try {
            const hashChallange = await this.service.login({ email, challange });
            res.status(201).json({ hashChallange });
        } catch (err) {
            next(err);
        }
    }

    async token(req, res, next) {
        const { hashChallange } = req.body;
        try {
            const jsonWebToken = await this.service.token({ hashChallange });
            res.status(201).json({ jsonWebToken });
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        const { hashChallange } = req.body;
        try {
            await this.service.logout({ hashChallange });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthController;