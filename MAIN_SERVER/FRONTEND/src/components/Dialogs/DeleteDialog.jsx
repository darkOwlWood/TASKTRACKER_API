import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
} from '@material-ui/core';
import { deleteTask } from '../../Redux/Task/Thunks';

const DeleteDialog = ({ open, setOpen, taskData }) => {

    const dispatch = useDispatch();
    const closeDialog = () => setOpen(false);
    const performAction = () => {
        dispatch(deleteTask(taskData._id));
        closeDialog();
    }

    return (
        <>
            <Dialog open={open} onClose={closeDialog}>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this task?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={performAction}>Yes</Button>
                    <Button onClick={closeDialog}>No</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteDialog;