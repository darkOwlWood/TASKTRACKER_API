import { StarRate } from '@material-ui/icons';
import { saveState } from '../stateManagement';

export const reducers = {
    login: (state, action) => {
        const { name } = action.payload;
        state.name = name;
        state.isLog = true;
        saveState('user', state);
    },
    logout: (state, action) => {
        state.name = '';
        state.isLog = false;
        state.selectedItem = '';
        saveState('user', state);
    },
    setSelectItem: (state, action) => {
        const { payload: _id } = action;
        state.selectedItem = _id;
    }
}