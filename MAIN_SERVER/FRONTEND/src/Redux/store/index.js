import { configureStore } from '@reduxjs/toolkit';
import taskSlice from '../Task/Slice';
import userSlice from '../User/Slice';

export default configureStore({
    reducer: {
        task: taskSlice,
        user: userSlice,
    }
})