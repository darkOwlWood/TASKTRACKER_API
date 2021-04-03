const MongoLib = require('../lib/MongoLib');
const { ObjectId } = require('mongodb');

class UserService {
    constructor() {
        this.collection = 'users';
        this.client = new MongoLib();
    }

    async getUser({ userId }) {
        const user = (await this.client.select(this.collection, { _id: ObjectId(userId) }))[0];
        delete user.password;
        return user;
    }
}

module.exports = UserService;