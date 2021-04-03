import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { updateTask } from '../../Redux/Task/Thunks';

const useStyles = makeStyles({
    dialogContent: {
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});

const DateDialog = ({ open, setOpen, taskData }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [dueDate, setDueDate] = useState({});

    const closeDialog = () => setOpen(false);
    const validateDate = date => {
        const isAfter = dayjs(date).isAfter(dayjs().add(9, 'minute'));
        setError(isAfter ? '' : 'At last 10 min before current date');
        return isAfter;
    }
    const changeDate = date => {
        setDueDate(date);
        validateDate(date);
    }
    const performAction = () => {
        if (!error && validateDate(dueDate)) {
            dispatch(updateTask({ ...taskData, dueDate }));
            closeDialog();
        }
    }

    useEffect(() => {
        open && setDueDate(dayjs().add(10, 'minute'));
    }, [open]);

    return (
        <>
            <Dialog open={open} onClose={closeDialog}>
                <DialogContent className={classes.dialogContent}>
                    <Typography>
                        Set a new date:
                    </Typography>
                    <DateTimePicker
                        disablePast
                        label="Due date"
                        name="dueDate"
                        format="MM/DD/YY HH:mm"
                        value={dueDate}
                        onChange={changeDate}
                        error={Boolean(error)}
                        helperText={error}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={performAction}>Ok</Button>
                    <Button onClick={closeDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DateDialog;