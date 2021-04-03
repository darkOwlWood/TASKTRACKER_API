import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
    Paper,
    makeStyles,
    Typography,
    useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles({
    homeCard: {
        width: '600px',
        height: '200px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    }
})

const Home = () => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.homeCard}>
                <Typography variant={matches ? "h6" : "subtitle1"}>
                    Welcome to the Task API, from here you can create your task with a detailed description and set a due
                    date to know when it will to expire, in everymoment this application will tell you if the task you set
                    is complete, not complete or due base of the parameters to write on it.
                </Typography>
            </Paper>
        </>
    );
}

export default Home;