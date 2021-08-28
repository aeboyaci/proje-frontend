import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../Layout";
import {Link} from "react-router-dom";
import {Alert} from "@material-ui/lab";
import {Collapse, IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginBottom: theme.spacing(12),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    center: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        "&:hover": {
            color: "#1A5591"
        }
    }
}));

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email adresi boş bırakılamaz.").email("Email formatı hatalı."),
    password: Yup.string().required("Parola boş bırakılamaz"),
})

export default function Login() {
    const classes = useStyles();

    let initialState = {
        email: "",
        password: "",
        isRobot: false,
    };

    const [open, setOpen] = useState(false);

    return (
        <Layout>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Giriş Yap
                </Typography>
                <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={(values, {validateForm, resetForm, setSubmitting}) => {
                    validateForm().then(() => {
                        if (!values.isRobot) {
                            setOpen(true);
                        }
                        else {
                            console.log(values);
                            resetForm();
                            setOpen(false);
                        }
                        setSubmitting(false);
                    });
                }}>
                    {({errors,
                      touched,
                      values,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                      setSubmitting}) => (
                        <Form onSubmit={handleSubmit} className={classes.form}>
                            <Collapse in={open}>
                                <Alert
                                    severity={"error"}
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    Robot olmadığınızı doğrulayın!
                                </Alert>
                            </Collapse>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Email Adresiniz"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Parolanız"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <FormControlLabel
                                control={<Checkbox onChange={handleChange} checked={values.isRobot} name={"isRobot"} color="primary" />}
                                label="Robot değilim"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => setSubmitting(true)}
                            >
                                Giriş Yap
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/account/register" className={classes.link}>
                                        Hesabınız var mı ? Buradan giriş yapın.
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        </Layout>
    );
}
