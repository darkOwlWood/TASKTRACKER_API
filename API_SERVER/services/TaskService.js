const MongoLib = require('../lib/MongoLib');
const { ObjectId } = require('mongodb');

class TaskService {
    constructor() {
        this.collection = 'tasks';
        this.client = new MongoLib();
    }

    async getTaskById({ userId, taskId }) {
        const task = (await this.client.select(this.collection, { _id: ObjectId(taskId), userId: ObjectId(userId) }))[0];
        return task;
    }

    async getTaskListByUser({ userId }) {
        return await this.client.select(this.collection, { userId: ObjectId(userId) });
    }

    async addTask({ userId, task }) {
        const taskId = await this.client.insert(this.collection, { ...task, userId: ObjectId(userId) });
        const taskResonse = await this.getTaskById({ userId, taskId });
        return taskResonse;
    }

    async updateTask({ userId, taskId, task }) {
        task.userId = ObjectId(task.userId);
        const modifiedCount = await this.client.update(this.collection, { _id: ObjectId(taskId), userId: ObjectId(userId) }, { '$set': { ...task, userId: ObjectId(userId) } });
        const taskResonse = await this.getTaskById({ userId, taskId });
        return taskResonse;
    }

    async deleteTask({ userId, taskId }) {
        const deletedCount = await this.client.delete(this.collection, { _id: ObjectId(taskId), userId: ObjectId(userId) });
        return deletedCount;
    }

    async userIsOwner({ userId, taskId }) {
        const task = await this.client.select(this.collection, { _id: ObjectId(taskId), userId: ObjectId(userId) });
        return Boolean(task.length);
    }
}

module.exports = TaskService;