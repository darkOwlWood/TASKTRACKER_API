import React from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import { TextFieldWrapper, DateTimePickerWrapper } from '../FormikWrappers';

const useStyles = makeStyles({
    dialogContent: {
        height: '300px',
    },
    inputComponent: {
        width: '240px',
    }
});

const validationSchema = Yup.object({
    title: Yup.string().max(50, 'No more than 50 characters').required('Required'),
    description: Yup.string().max(300, 'No more than 300 characters').required('Required'),
    dueDate: Yup.date().required('Required'),
});

const TaskDialogLayout = ({ label, closeDialog, submitForm, isSubmitting }) => {

    const classes = useStyles();

    return (
        <>
            <Form>
                <DialogTitle>
                    <Typography component="div" variant="h5">
                        {`${label} Task`}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid
                        className={classes.dialogContent}
                        container
                        direction="column"
                        justify="space-around"
                        alignItems="center"
                    >

                        <TextFieldWrapper
                            id="title"
                            label="Title"
                            name="title"
                            type="text"
                            className={classes.inputComponent}
                        />
                        <TextFieldWrapper
                            label="Description"
                            multiline
                            name="description"
                            rows={4}
                            rowsMax={4}
                            type="text"
                            className={classes.inputComponent}
                        />
                        <DateTimePickerWrapper
                            disablePast
                            id="dueDate"
                            label="Due date"
                            name="dueDate"
                            className={classes.inputComponent}
                        />
                    </Grid>
                    <DialogActions>
                        <Button
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}
                            variant="contained"
                        >
                            {label}
                        </Button>
                        <Button
                            color="primary"
                            disabled={isSubmitting}
                            onClick={closeDialog}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Form>
        </>
    );
}

const TaskDialog = ({ label, open, setOpen, reduxThunk, taskData }) => {

    const dispatch = useDispatch();
    const InitialValues = { title: '', description: '', dueDate: (() => dayjs().add(10, 'minute'))() };

    const closeDialog = () => {
        setOpen(false);
    }
    const performAction = values => {
        dispatch(reduxThunk(values));
        closeDialog();
    }

    return (
        <>
            <Dialog
                maxWidth="xs"
                onClose={closeDialog}
                open={open}
                fullWidth={true}
            >
                <Formik
                    validationSchema={validationSchema}
                    initialValues={taskData || InitialValues}
                    onSubmit={
                        (values, { setSubmitting }) => {
                            performAction(values);
                        }
                    }
                >
                    {
                        ({ submitForm, isSubmitting }) => (
                            <TaskDialogLayout
                                label={label}
                                closeDialog={closeDialog}
                                submitForm={submitForm}
                                isSubmitting={isSubmitting}
                            />
                        )
                    }
                </Formik>
            </Dialog>
        </>
    );
}

export default TaskDialog;