import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    Menu,
    MenuItem,
    AppBar,
    Toolbar,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { Home as HomeIcon, AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { getUserIsLog } from '../../Redux/User/Selectors';
import { logout } from '../../Redux/User/Slice';

const PROTOCOL = process.env.PROTOCOL;
const AUTH_SERVER = process.env.AUTH_SERVER;
const WITH_CREDENTIALS = Boolean(process.env.WITH_CREDENTIALS);

const useStyles = makeStyles({
    headerTitle: {
        flex: '2',
        textAlign: 'center'
    }
});

const Header = () => {

    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const isLog = useSelector(getUserIsLog);
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = event => setAnchorEl(event.target);
    const closeMenu = () => setAnchorEl(null);
    const handleRoute = route => {
        history.push(route);
        closeMenu();
    }
    const onSubmit = async () => {
        try {
            closeMenu();
            await axios.post(
                `${PROTOCOL}://${AUTH_SERVER}/auth/logout`, {},
                { withCredentials: WITH_CREDENTIALS }
            );
            dispatch(logout());
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={() => handleRoute('/')}>
                        <HomeIcon />
                    </IconButton>
                    <Typography className={classes.headerTitle} variant="h5">
                        Task Tracker
                    </Typography>
                    <IconButton onClick={openMenu} ref={anchorEl}>
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={closeMenu}
                    >
                        {
                            isLog ?
                                <div>
                                    <MenuItem onClick={() => handleRoute('/taskmenu')} >Task Menu</MenuItem>
                                    <MenuItem onClick={onSubmit}>Logout</MenuItem>
                                </div>
                                :
                                <div>
                                    <MenuItem onClick={() => handleRoute('/login')} >Login</MenuItem>
                                    <MenuItem onClick={() => handleRoute('/signin')}>Signin</MenuItem>
                                </div>
                        }
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;