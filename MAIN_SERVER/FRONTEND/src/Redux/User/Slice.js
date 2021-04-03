import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '../stateManagement';
import { initialState } from './InitialState';
import { reducers } from './Reducers';

const userSlice = createSlice({
    name: 'user',
    initialState: loadState('user', initialState),
    reducers,
});

export const { login, logout, setSelectItem } = userSlice.actions;

export default userSlice.reducer;