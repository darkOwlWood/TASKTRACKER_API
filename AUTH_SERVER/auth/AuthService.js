const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { config } = require('../config');
const MongoLib = require('../lib/MongoLib');
const UserService = require('../user/UserService');

class AuthService {
    constructor() {
        this.collection = 'authorizations';
        this.secretJwtAccess = config.secretJwtAccess;
        this.jwtExpireTimeMs = config.jwtExpireTimeMs;
        this.client = new MongoLib();
        this.userService = new UserService();
    }

    async signin({ userModel }) {
        const insertedId = (!await this.userService.emailExist(userModel)) ?
            (await this.userService.registerUser({ userModel }))
            : '';
        delete userModel.password;
        return Boolean(insertedId);
    }

    async login({ email, challange }) {
        const user = await this.getUserByEmail({ email });
        await this.cleanUserChallange(user);
        return await this.generateUserChallange({ ...user, challange });
    }

    async token({ hashChallange }) {
        const [email, hash] = hashChallange.split('#');
        const user = await this.getUserByEmail({ email });
        return (await this.verifyChallange({ ...user, hash })) && this.generateJsonWebToken(user);
    }

    async logout({ hashChallange }) {
        const [email, hash] = hashChallange.split('#');
        const user = await this.getUserByEmail({ email });
        Boolean(user) && (await this.cleanUserChallange(user));
    }

    async cleanUserChallange({ _id }) {
        await this.client.delete(this.collection, { userId: ObjectId(_id) });
    }

    async generateUserChallange({ _id, email, challange }) {
        const challangeReady = `${_id}:${challange}`;
        const hashChallange = await bcrypt.hash(challangeReady, 10);
        await this.client.insert(this.collection, { userId: ObjectId(_id), challangeReady, createDate: new Date, updateDate: new Date() });
        return `${email}#${hashChallange}`;
    }

    async verifyChallange({ _id, hash }) {
        const authorization = (await this.client.select(this.collection, { userId: ObjectId(_id) }))[0];
        return await bcrypt.compare(authorization.challangeReady, hash);
    }

    async getUserByEmail({ email }) {
        const user = await this.userService.getUserByEmail({ email });
        Boolean(user) && delete user.password;
        return user;
    }

    generateJsonWebToken({ _id: userId, name }) {
        return jsonwebtoken.sign(
            { userId, name },
            this.secretJwtAccess,
            { expiresIn: `${this.jwtExpireTimeMs}ms` }
        );
    }
}

module.exports = AuthService;