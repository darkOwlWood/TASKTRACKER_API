import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
    Grid,
    Paper,
    Slide,
    Button,
    Snackbar,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@material-ui/icons';
import { TextFieldWrapper } from '../FormikWrappers';

const PROTOCOL = process.env.PROTOCOL;
const AUTH_SERVER = process.env.AUTH_SERVER;
const WITH_CREDENTIALS = Boolean(process.env.WITH_CREDENTIALS);

const useStyles = makeStyles({
    mainGrid: {
        width: '400px',
        height: '550px',
    },
    formButton: {
        width: '200px',
        alignSelf: 'center',
        fontWeight: 'bolder',
        backgroundImage: 'linear-gradient(80deg, rgba(0,122,193,1) 20%, rgba(3,169,244,1) 80%, rgba(103,218,255,1) 100%)',
    },
    helperText: {
        width: '200px',
        wordWrap: 'break-word',
    },
    snackbar: {
        position: 'absolute',
    },
    snackbarContent: {
        width: '320px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bolder',
    },
    success: {
        color: '#fff',
        backgroundColor: '#357a38',
    },
    error: {
        color: '#fff',
        backgroundColor: '#aa2e25',
    },
});

const validationSchema = Yup.object({
    name:      Yup.string().max(30, 'No more than 30 characters').required('Required'),
    lastName:  Yup.string().max(50, 'No more than 50 characters').required('Required'),
    email:     Yup.string().max(50, 'No more than 50 characters').email('It should be a valid email').required('Required'),
    password:  Yup
        .string()
        .min(10, 'At least 10 characters or more')
        .max(50, 'No more than 30 characters')
        .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{10,30}$/, 'Should have at least one uppercase, lowercase and number')
        .required('Required'),
    passwordRepeat: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords don\'t match!').required('Required'),
});

const SlideRight = props => <Slide {...props} direction="right" />;

const SigninLayout = ({ submitForm, isSubmitting }) => {

    const classes = useStyles();

    return (
        <>
            <Form>
                <Grid
                    className={classes.mainGrid}
                    container
                    direction="column"
                    alignItems="center"
                    justify="space-around"
                    component={Paper}
                >
                    <Typography variant="h5">
                        Register
                    </Typography>
                    <TextFieldWrapper
                        id="name"
                        label="Name"
                        name="name"
                        size="small"
                        type="text"
                    />
                    <TextFieldWrapper
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        size="small"
                        type="text"
                    />
                    <TextFieldWrapper
                        id="email"
                        label="Email"
                        name="email"
                        size="small"
                        type="email"
                    />
                    <TextFieldWrapper
                        id="password"
                        label="Password"
                        name="password"
                        size="small"
                        type="password"
                        FormHelperTextProps={{ className: classes.helperText }}
                    />
                    <TextFieldWrapper
                        id="passwordRepeat"
                        label="Repeat Password"
                        name="passwordRepeat"
                        size="small"
                        type="password"
                    />
                    <Button
                        className={classes.formButton}
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                        disabled={isSubmitting}
                    >
                        SEND
                    </Button>
                </Grid>
            </Form>
        </>
    );
}

const Signin = () => {

    const classes = useStyles();
    const history = useHistory();
    const [snackData, setSnackData] = useState({ open: false, type: 'success', icon: CheckCircleIcon, message: '', });

    const closeSnack = () => setSnackData({ ...snackData, open: false });
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        const submit = async () => {
            try {
                const { passwordRepeat, ...userModel } = values;
                await axios.post(
                    `${PROTOCOL}://${AUTH_SERVER}/auth/signin`,
                    { ...userModel },
                    { withCredentials: WITH_CREDENTIALS }
                );
                resetForm({ isSubmitting: true });
                setSnackData({ open: true, type: 'success', icon: CheckCircleIcon, message: 'Successfully registration' });
                setTimeout(() => { history.push('/') }, 3000);
            } catch (err) {
                // console.error(err.response);
                const message = (err.response && err.response.status) === 409 ?
                    'The email is already in use'
                    : 'Something wrong happen, try latter';
                setSnackData({ open: true, type: 'error', icon: CancelIcon, message, });
                setTimeout(() => setSubmitting(false), 3000);
            }
        }
        submit();
    };

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                initialValues={{ name: '', lastName: '', email: '', password: '', passwordRepeat: '' }}
                onSubmit={onSubmit}
            >
                {SigninLayout}
            </Formik>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={snackData.open}
                onClose={closeSnack}
                autoHideDuration={5000}
                className={classes.snackbar}
                TransitionComponent={SlideRight}
            >
                <Typography component="div">
                    <Paper className={`${classes.snackbarContent} ${classes[snackData.type]}`}>
                        <snackData.icon />
                        {snackData.message}
                    </Paper>
                </Typography>
            </Snackbar>
        </>
    );
}

export default Signin