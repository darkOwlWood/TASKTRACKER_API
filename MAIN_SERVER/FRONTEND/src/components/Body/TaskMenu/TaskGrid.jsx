import React from 'react';
import {
    Grid,
    Paper,
    makeStyles,
} from '@material-ui/core';

import DueItem from '../../Items/DueItem';
import Complete from '../../Items/CompleteItem';
import NotCompleteItem from '../../Items/NotCompleteItem';

import TaskColumns from './TaskColumns';

const useStyles = makeStyles({
    mainGrid: {
        height: '100%',
        width: '100%',
        padding: '20px 0',
        boxSizing: 'border-box',
    },
    columnGrid: {
        overflow: 'hidden',
        position: 'relative',
    },
});

const TaskGrid = ({ tasksLists, update, remove, complete, unComplete, date, view }) => {

    const classes = useStyles();
    const { dueList, completeList, notCompleteList } = tasksLists;

    return (
        <>
            <Grid
                alignItems="center"
                className={classes.mainGrid}
                container
                justify="space-around"
            >
                <Grid
                    className={classes.columnGrid}
                    component={Paper}
                    item
                    md={3}
                >
                    <TaskColumns
                        label="Due"
                        taskList={dueList}
                        ItemComponent={DueItem}
                        ItemComponentHandlers={{ update, remove, complete, view }}
                    />
                </Grid>
                <Grid
                    className={classes.columnGrid}
                    component={Paper}
                    item
                    md={3}
                >
                    <TaskColumns
                        label="Complete"
                        taskList={completeList}
                        ItemComponent={Complete}
                        ItemComponentHandlers={{ update, remove, unComplete, view }}
                    />
                </Grid>
                <Grid
                    className={classes.columnGrid}
                    component={Paper}
                    item
                    md={3}
                >
                    <TaskColumns
                        label="Not Complete"
                        taskList={notCompleteList}
                        ItemComponent={NotCompleteItem}
                        ItemComponentHandlers={{ update, remove, complete, date, view }}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default TaskGrid;