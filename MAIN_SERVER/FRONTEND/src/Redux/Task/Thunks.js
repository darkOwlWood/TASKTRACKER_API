import { createAsyncThunk } from '@reduxjs/toolkit';
import { gql, GraphQLClient } from 'graphql-request';
import { saveState } from '../stateManagement';
import axios from 'axios';
import dayjs from 'dayjs';

const PROTOCOL = process.env.PROTOCOL;
const WITH_CREDENTIALS = Boolean(process.env.WITH_CREDENTIALS);
const API_SERVER = process.env.API_SERVER;
const AUTH_SERVER = process.env.AUTH_SERVER;
const client = new GraphQLClient(`${PROTOCOL}://${API_SERVER}/graphql`);

const checkTaskStatus = task => {
    return task.complete === 1 ? 'Complete'
        : (dayjs(new Date()).isSame(task.dueDate) || dayjs(new Date()).isAfter(task.dueDate)) ?
            'NotComplete' : 'Due';
}

const getToken = async () => {
    try {
        await axios.post(`${PROTOCOL}://${AUTH_SERVER}/auth/token`, {}, { withCredentials: WITH_CREDENTIALS });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

const performRequest = async ({ query, variables }, retry) => {
    try {
        const resp = await client.request(query, variables, { withCredentials: WITH_CREDENTIALS });
        return resp;
    } catch (err) {
        const { status } = err.response;
        return (retry && status === 401 && await getToken()) && await performRequest({ query, variables }, false);
    }
}

export const getTaskListByUser = createAsyncThunk('task/getTaskListByUser', async ({ }, thunkAPI) => {
    const query = gql`
        query{
            getTaskListByUser{
                _id,
                title,
                description,
                complete,
                issueDate,
                dueDate
            }
        }
    `;
    const variables = {};

    const taskList = await performRequest({ query, variables }, true);
    return !taskList ? thunkAPI.rejectWithValue() : taskList;
});

export const addTask = createAsyncThunk('task/addTask', async (task, thunkAPI) => {
    task = { ...task, issueDate: new Date(), complete: 0 };
    const query = gql`
        mutation newTask($task: TaskInput){
            addTask(task: $task){
                _id,
                title,
                description,
                complete,
                issueDate,
                dueDate
            }
        }
    `;
    const variables = { task };

    const taskAdded = await performRequest({ query, variables }, true);
    return !taskAdded ? thunkAPI.rejectWithValue() : taskAdded;
});

export const updateTask = createAsyncThunk('task/updateTask', async ({ _id: taskId, ...task }, thunkAPI) => {
    const query = gql`
        mutation renewTask($taskId: ID, $task: TaskInput){
            updateTask(taskId: $taskId ,task: $task){
                _id,
                title,
                description,
                complete,
                issueDate,
                dueDate,
            }
        }
    `;
    const variables = { taskId, task };

    const taskUpdated = await performRequest({ query, variables }, true);
    return !taskUpdated ? thunkAPI.rejectWithValue() : taskUpdated;
});

export const deleteTask = createAsyncThunk('task/deleteTask', async (taskId, thunkAPI) => {
    const query = gql`
        mutation eraseTask($taskId: ID){
            deleteTask(taskId: $taskId)
        }
    `;
    const variables = { taskId };

    const taskDeleted = await performRequest({ query, variables }, true);
    return !taskDeleted ? thunkAPI.rejectWithValue : { taskId, ...taskDeleted };
});

export const extraReducers = builder => {
    builder
        .addCase(getTaskListByUser.fulfilled, (state, action) => {
            const { getTaskListByUser: taskList } = action.payload;
            Object.keys(state).forEach(list => state[list] = []);
            taskList.forEach(task => state[checkTaskStatus(task)].unshift(task));
        })
        .addCase(addTask.fulfilled, (state, action) => {
            const { addTask: task } = action.payload;
            state[checkTaskStatus(task)].unshift(task);
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            const { updateTask: task } = action.payload;
            Object.keys(state).forEach(list => {
                state[list] = state[list].filter(taskItem => taskItem._id !== task._id);
            });
            state[checkTaskStatus(task)].unshift(task);
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            const { taskId, deleteTask } = action.payload;
            deleteTask && Object.keys(state).forEach(list => {
                state[list] = state[list].filter(task => task._id !== taskId);
            });
        })
}