const bcrypt = require('bcrypt');
const MongoLib = require('../lib/MongoLib');

class UserService {
    constructor() {
        this.collection = 'users';
        this.client = new MongoLib();
    }

    async getUserByEmail({ email }) {
        return (await this.client.select(this.collection, { email }))[0];
    }

    async registerUser({ userModel }) {
        userModel.password = await bcrypt.hash(userModel.password, 10);
        return await this.client.insert(this.collection, userModel);
    }

    async emailExist({ email }) {
        const user = await this.getUserByEmail({ email });
        return Boolean(user);
    }

    async passwordMatch({ email, password }) {
        const user = await this.getUserByEmail({ email });
        return Boolean(user && (await bcrypt.compare(password, user.password)));
    }
}

module.exports = UserService;