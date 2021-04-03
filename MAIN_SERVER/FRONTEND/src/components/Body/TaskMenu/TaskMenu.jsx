import React, { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';
import { Fab, makeStyles, useMediaQuery } from '@material-ui/core';

import ViewDialog from '../../Dialogs/ViewDialog';
import TaskDialog from '../../Dialogs/TaskDialog';
import DeleteDialog from '../../Dialogs/DeleteDialog';
import DateDialog from '../../Dialogs/DateDialog';
import { selectListELements } from '../../../Redux/Task/Selectors';
import { getTaskListByUser, addTask, updateTask } from '../../../Redux/Task/Thunks';

import TaskTabs from './TaskTabs';
import TaskGrid from './TaskGrid';

const useStyles = makeStyles({
    taskMenu: {
        width: '100%',
        Height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabButton: {
        backgroundColor: '#f06292',
        position: 'absolute',
        bottom: 3,
        left: 3,
    }
});

const muiTheme = createMuiTheme({
    palette: {
        secondary: {
            light: '#a84466',
            main: '#f06292',
            dark: '#f381a7',
        }
    }
});

const TaskMenu = () => {

    const theme = useTheme();
    const classes = useStyles();
    const dispacth = useDispatch();
    const matches = useMediaQuery(theme.breakpoints.up('md'), { defaultMatches: true });
    const [matchQuery, setMatchQuery] = useState(false);
    
    const [taskData, setTaskData] = useState({});
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDate, setOpenDate] = useState(false);
    const [openView, setOpenView] = useState(false);
    
    const dueList = useSelector(selectListELements('Due'));
    const completeList = useSelector(selectListELements('Complete'));
    const notCompleteList = useSelector(selectListELements('NotComplete'));
    const tasksLists = { dueList, completeList, notCompleteList };

    const openCreateTask = () => setOpenCreate(true);
    const openViewTask = ({ _id, title, description, dueDate, issueDate, complete }) => {
        setTaskData({ _id, title, description, dueDate, issueDate, complete });
        setOpenView(true);
    }
    const openUpdateTask = ({ _id, title, description, dueDate, issueDate, complete }) => {
        setTaskData({ _id, title, description, dueDate, issueDate, complete });
        setOpenUpdate(true);
    }
    const openDeleteTask = ({ _id }) => {
        setTaskData({ _id });
        setOpenDelete(true);
    }
    const markCompleteTask = ({ _id, title, description, dueDate, issueDate }) => {
        dispacth(updateTask({ _id, title, description, dueDate, issueDate, complete: 1 }));
    }
    const unMarkCompleteTask = ({ _id, title, description, dueDate, issueDate }) => {
        dispacth(updateTask({ _id, title, description, dueDate, issueDate, complete: 0 }));
    }
    const openDateTask = ({ _id, title, description, dueDate, issueDate, complete }) => {
        setTaskData({ _id, title, description, dueDate, issueDate, complete });
        setOpenDate(true);
    }
    
    useLayoutEffect(() => {
        dispacth(getTaskListByUser({}));
    }, []);

    useLayoutEffect(() => {
        setMatchQuery(matches);
    },[matches]);

    return (
        <>
            <div className={classes.taskMenu}>
                {
                    matchQuery ?
                        <TaskGrid
                            tasksLists={tasksLists}
                            update={openUpdateTask}
                            remove={openDeleteTask}
                            complete={markCompleteTask}
                            unComplete={unMarkCompleteTask}
                            date={openDateTask}
                            view={openViewTask}
                        />
                        :
                        <ThemeProvider theme={muiTheme}>
                            <TaskTabs
                                tasksLists={tasksLists}
                                update={openUpdateTask}
                                remove={openDeleteTask}
                                complete={markCompleteTask}
                                unComplete={unMarkCompleteTask}
                                date={openDateTask}
                                view={openViewTask}
                            />
                        </ThemeProvider>
                }

                <ThemeProvider theme={muiTheme}>
                    <Fab
                        aria-label="add"
                        color="primary"
                        onClick={openCreateTask}
                        className={classes.fabButton}
                        size={matchQuery ? "medium" : "small"}
                    >
                        <AddIcon />
                    </Fab>
                </ThemeProvider>

                <ViewDialog
                    open={openView}
                    setOpen={setOpenView}
                    taskData={taskData}
                />

                <TaskDialog
                    label={"Create"}
                    open={openCreate}
                    setOpen={setOpenCreate}
                    reduxThunk={addTask}
                />

                <TaskDialog
                    label={"Update"}
                    open={openUpdate}
                    setOpen={setOpenUpdate}
                    reduxThunk={updateTask}
                    taskData={taskData}
                />

                <DeleteDialog
                    open={openDelete}
                    setOpen={setOpenDelete}
                    taskData={taskData}
                />

                <DateDialog
                    open={openDate}
                    setOpen={setOpenDate}
                    taskData={taskData}
                />
            </div>
        </>
    );
}

export default TaskMenu;