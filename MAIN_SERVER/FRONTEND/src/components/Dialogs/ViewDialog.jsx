import React from 'react';
import dayjs from 'dayjs';
import {
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    makeStyles,
    Typography,
    Paper,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

const checkTaskStatus = task => {
    return task.complete === 1 ? 'Complete'
        : (dayjs(new Date()).isSame(task.dueDate) || dayjs(new Date()).isAfter(task.dueDate)) ?
            'Not Complete' : 'Due';
}

const useStyles = makeStyles({
    dialogTitle: {
        position: 'relative',
    },
    dialogContent: {
        height: '300px',
    },
    infoTitle: {
        textAlign: 'center',
    },
    infoBody: {
        width: '300px',
        height: '100px',
        overflowX: 'auto',
        wordBreak: 'break-word',
        backgroundColor: '#eceff1',
    },
    closeButton: {
        top: 3,
        right: 3,
        position: 'absolute',
    }
});

const ViewDialog = ({ open, setOpen, taskData }) => {

    const classes = useStyles();
    const closeDialog = () => setOpen(false);

    return (
        <>
            <Dialog
                open={open}
                onClose={closeDialog}
                fullWidth={true}
                maxWidth="xs"
            >
                <DialogTitle className={classes.dialogTitle}>
                    <Typography component="div" variant="h5">
                        Task Data
                    </Typography>
                    <IconButton className={classes.closeButton} onClick={closeDialog}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        direction="column"
                        justify="space-around"
                        alignItems="center"
                        className={classes.dialogContent}
                    >
                        <Typography component="div" variant="h6">
                            {`Title: ${taskData.title}`}
                        </Typography>
                        <Typography component="div" variant="h6">
                            <Grid
                                container
                                direction="column"
                            >
                                <div className={classes.infoTitle}>Description:</div>
                                <Paper className={classes.infoBody}>{taskData.description}</Paper>
                            </Grid>
                        </Typography>
                        <Typography component="div" variant="h6">
                            {`Status: ${checkTaskStatus(taskData)}`}
                        </Typography>
                        <Typography component="div" variant="h6">
                            {`Issue Date: ${dayjs(taskData.issueDate).format('DD MMMM YYYY HH:mm:ss')}`}
                        </Typography>
                        <Typography component="div" variant="h6">
                            {`Due Date: ${dayjs(taskData.dueDate).format('DD MMMM YYYY HH:mm:ss')}`}
                        </Typography>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default ViewDialog;