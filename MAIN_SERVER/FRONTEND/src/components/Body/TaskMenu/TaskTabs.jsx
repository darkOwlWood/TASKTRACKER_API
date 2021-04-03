import React, { useState } from 'react';
import {
    Tab,
    Tabs,
    AppBar,
    makeStyles,
} from '@material-ui/core';
import {
    Done as DoneIcon,
    Close as CloseIcon,
    Schedule as ScheduleIcon,
} from '@material-ui/icons';
import DueItem from '../../Items/DueItem';
import Complete from '../../Items/CompleteItem';
import NotCompleteItem from '../../Items/NotCompleteItem';
import TaskColumns from './TaskColumns';

const useStyles = makeStyles(theme => ({
    root: {
        width: '500px',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    tabButton: {
        flex: 1,
    },
}));

const TabPanel = ({ children, value, index }) => {
    return (
        <>
            <div
                role="tabpanel"
                hidden={value !== index}
            >
                {children}
            </div>
        </>
    );
}

const TaskTabs = ({ tasksLists, update, remove, complete, unComplete, date, view }) => {

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const { dueList, completeList, notCompleteList } = tasksLists;

    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label={"simple tabs example"}
                        centered
                    >
                        <Tab className={classes.tabButton} icon={<ScheduleIcon />} />,
                        <Tab className={classes.tabButton} icon={<DoneIcon />} />
                        <Tab className={classes.tabButton} icon={<CloseIcon />} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <TaskColumns
                        label="Due"
                        taskList={dueList}
                        ItemComponent={DueItem}
                        ItemComponentHandlers={{ update, remove, complete, view }}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TaskColumns
                        label="Complete"
                        taskList={completeList}
                        ItemComponent={Complete}
                        ItemComponentHandlers={{ update, remove, unComplete, view }}
                    />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TaskColumns
                        label="Not Complete"
                        taskList={notCompleteList}
                        ItemComponent={NotCompleteItem}
                        ItemComponentHandlers={{ update, remove, complete, date, view }}
                    />
                </TabPanel>
            </div>
        </>
    );
}

export default TaskTabs;