import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
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
import { login } from '../../Redux/User/Slice';

const PROTOCOL = process.env.PROTOCOL;
const AUTH_SERVER = process.env.AUTH_SERVER;
const WITH_CREDENTIALS = Boolean(process.env.WITH_CREDENTIALS);

const useStyles = makeStyles({
    mainGrid: {
        width: '400px',
        height: '450px',
    },
    formButton: {
        width: '200px',
        alignSelf: 'center',
        fontWeight: 'bolder',
        backgroundImage: 'linear-gradient(80deg, rgba(0,122,193,1) 20%, rgba(3,169,244,1) 80%, rgba(103,218,255,1) 100%)',
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
    error: {
        color: '#fff',
        backgroundColor: '#aa2e25',
    },
});

const validationSchema = Yup.object({
    email:    Yup.string().email('It should be a valid email').required('Required'),
    password: Yup.string().required('Required'),
});

const SlideRight = props => <Slide {...props} direction="right" />;

const LoginLayout = ({ submitForm, isSubmitting }) => {

    const classes = useStyles();

    return (
        <>
            <Form>
                <Grid
                    className={classes.mainGrid}
                    container
                    direction="column"
                    component={Paper}
                    alignItems="center"
                    justify="space-around"
                >
                    <Typography variant="h5">
                        Login
                    </Typography>
                    <TextFieldWrapper
                        id="email"
                        label="Email"
                        name="email"
                        type="email"
                    />
                    <TextFieldWrapper
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                    />
                    <Button
                        className={classes.formButton}
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                        disabled={isSubmitting}
                    >
                        Enter
                    </Button>
                </Grid>
            </Form>
        </>
    )
}

const Login = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [snackData, setSnackData] = useState({ open: false, type: 'success', icon: CheckCircleIcon, message: '', });

    const closeSnack = () => setSnackData({ ...snackData, open: false });
    const onSubmit = ({ email, password }, { setSubmitting }) => {
        const submit = async () => {
            try {
                const resp = await axios.post(
                    `${PROTOCOL}://${AUTH_SERVER}/auth/login`, {},
                    { headers: { Authorization: `Basic ${btoa(`${email}:${password}`)}` }, withCredentials: WITH_CREDENTIALS }
                );
                dispatch(login({ name: '' }));
            } catch (err) {
                // console.error(err.response);
                const message = (err.response && err.response.status) === 401 ?
                    'Wrong credentials'
                    : 'Something wrong happen, try latter';
                setSnackData({ open: true, type: 'error', icon: CancelIcon, message, });
                setTimeout(() => setSubmitting(false), 3000);
            }
        }
        submit();
    }

    return (
        <>
            <Formik
                validationSchema={validationSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={onSubmit}
            >
                {LoginLayout}
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

export default Login;