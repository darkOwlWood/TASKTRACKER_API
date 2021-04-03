import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    columnGridTitle: {
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#0077c2',
        color: '#fff',
    },
    columnGridWrapper: {
        height: '500px',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
    },
});

const TaskColumns = ({ label, taskList, ItemComponent, ItemComponentHandlers }) => {

    const classes = useStyles();
    const { update, remove, complete, unComplete, date, view } = ItemComponentHandlers;

    return (
        <>
            <Typography className={classes.columnGridTitle}>{label}</Typography>
            <div className={classes.columnGridWrapper}>
                {
                    taskList.map((task, ndx) =>
                        <ItemComponent
                            key={ndx}
                            _id={task._id}
                            title={task.title}
                            update={update ? () => update(task) : () => { }}
                            remove={remove ? () => remove(task) : () => { }}
                            complete={complete ? () => complete(task) : () => { }}
                            unComplete={unComplete ? () => unComplete(task) : () => { }}
                            date={date ? () => date(task) : () => { }}
                            view={view ? () => view(task) : () => { }}
                        />
                    )
                }
            </div>
        </>
    );
}

export default TaskColumns;