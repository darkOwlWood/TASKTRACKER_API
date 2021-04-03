import React from 'react';
import Header from './Header';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    mainGrid: {
        height: '100vh',
        boxSizing: 'border-box',
    },
    headerGrid: {
        width: '100%',
    },
    bodyGrid: {
        width: '100%',
        flex: '2',
    }
});

const Layout = ({ children }) => {

    const classes = useStyles();

    return (
        <>
            <Grid
                className={classes.mainGrid}
                container
                direction="column"
                wrap="nowrap"
            >
                <Grid item className={classes.headerGrid}>
                    <Header />
                </Grid>
                <Grid item className={classes.bodyGrid}>
                    <div className="home">
                        <div className="home__body">
                            {
                                children
                            }
                        </div>
                        <div className="home__wrapper-container">
                            <div className="home__triangle-container">
                                <div className="triangle-1"></div>
                                <div className="triangle-2"></div>
                                <div className="triangle-3"></div>
                            </div>
                            <div className="home__triangle-container">
                                <div className="triangle-1"></div>
                                <div className="triangle-2"></div>
                                <div className="triangle-3"></div>
                            </div>
                            <div className="home__triangle-container">
                                <div className="triangle-1"></div>
                                <div className="triangle-2"></div>
                                <div className="triangle-3"></div>
                            </div>
                        </div>
                        <div className="home__rectangle"></div>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default Layout;