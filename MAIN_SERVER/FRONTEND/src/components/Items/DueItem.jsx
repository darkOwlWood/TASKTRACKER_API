import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
    Paper,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import {
    ArrowForwardIos as ArrowForwardIosIcon,
    Create as CreateIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
} from '@material-ui/icons';
import { setSelectItem } from '../../Redux/User/Slice';
import { getSelectedItem } from '../../Redux/User/Selectors';

const useStyles = makeStyles({
    taskItem: {
        marginBottom: '20px',
        backgroundColor: '#eceff1',
    },
    taskTitle: {
        textAlign: 'center',
        wordBreak: 'break-word',
    },
    smallIconWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    selectItem: {
        transition: '.4s',
        backgroundColor: '#9ea7aa',
    }
});

const DueItem = ({ _id, title, update, remove, complete, view }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const selectItem = useSelector(getSelectedItem);
    const handleSelectedItem = () => dispatch(setSelectItem(_id));

    return (
        <>
            <Grid
                alignItems="center"
                className={`${classes.taskItem} ${selectItem === _id ? classes.selectItem : ''}`}
                component={Paper}
                container
                onClick={handleSelectedItem}
            >
                <Grid
                    container
                    item
                    justify="center"
                    xs={2}
                >
                    <div className={classes.smallIconWrapper}>
                        <IconButton onClick={view} size="small">
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={update} size="small">
                            <CreateIcon />
                        </IconButton>
                        <IconButton onClick={remove} size="small">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <Typography className={classes.taskTitle}>
                        {
                            title.length > 40 ? `${title.slice(0, 40)}...` : `${title}`
                        }
                    </Typography>
                </Grid>
                <Grid
                    container
                    item
                    justify="center"
                    xs={2}
                >
                    <div className={classes.smallIconWrapper}>
                        <IconButton onClick={complete} size="small">
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default DueItem;