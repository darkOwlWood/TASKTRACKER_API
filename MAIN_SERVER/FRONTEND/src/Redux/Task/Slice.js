import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../stateManagement';
import { initialState } from './InitialState';
import { reducers } from './Reducers';
import { extraReducers } from './Thunks';

const taskSlice = createSlice({
    name: 'task',
    initialState: loadState('task', initialState),
    reducers,
    extraReducers,
});

export const { createElement, updateElement, deleteElement } = taskSlice.actions;

export default taskSlice.reducer;