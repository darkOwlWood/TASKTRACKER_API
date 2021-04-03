import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import App from './containers/App';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MuiPickersUtilsProvider utils={DayjsUtils}>
                <App />
            </MuiPickersUtilsProvider>
        </BrowserRouter>
    </Provider>
    , document.querySelector('#app'),
);