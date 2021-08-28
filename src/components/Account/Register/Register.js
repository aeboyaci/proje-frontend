import React, {useState} from 'react';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Layout from "../Layout";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {Collapse, IconButton} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from "yup";
import {Formik, Form} from "formik";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Ad boş bırakılamaz."),
    lastName: Yup.string().required("Soyad boş bırakılamaz."),
    email: Yup.string().required("Email adresi boş bırakılamaz.").email("Email formatı hatalı."),
    password: Yup.string().required("Parola boş bırakılamaz.").min(8, "Parola en az 8 karakter içermelidir."),
    rePassword: Yup.string().required("Parola doğrulama boş bırakılamaz.").oneOf(
        [Yup.ref("password")],
        "Parolalar eşleşmiyor."
    ),
    inviteCode: Yup.string().required("Davet kodu boş bırakılamaz."),
});

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
        marginTop: theme.spacing(4),
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

const Register = () => {
    const classes = useStyles();

    let initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: "",
        inviteCode: "",
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
                    Kayıt Ol
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
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      setSubmitting}) => (
                        <Form onSubmit={handleSubmit} className={classes.form}>
                            <Collapse style={{marginBottom: "1.2rem"}} in={open}>
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
                                    Robot olmadığınızı doğrulayın.
                                </Alert>
                            </Collapse>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        fullWidth
                                        label="Adınız"
                                        value={values.firstName}
                                        error={Boolean(touched.firstName && errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Soyadınız"
                                        name="lastName"
                                        autoComplete="lname"
                                        value={values.lastName}
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Email Adresiniz"
                                        name="email"
                                        autoComplete="email"
                                        value={values.email}
                                        error={Boolean(touched.email && errors.email)}
                                        helperText={touched.email && errors.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="password"
                                        label="Parolanız"
                                        type="password"
                                        autoComplete="current-password"
                                        value={values.password}
                                        error={Boolean(touched.password && errors.password)}
                                        helperText={touched.password && errors.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="rePassword"
                                        label="Parolanızı Doğrulayın"
                                        type="password"
                                        value={values.rePassword}
                                        error={Boolean(touched.rePassword && errors.rePassword)}
                                        helperText={touched.rePassword && errors.rePassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Davet Kodu"
                                        name="inviteCode"
                                        value={values.inviteCode}
                                        error={Boolean(touched.inviteCode && errors.inviteCode)}
                                        helperText={touched.inviteCode && errors.inviteCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox name={"isRobot"} onChange={handleChange} checked={values.isRobot} color="primary" />}
                                        label="Robot değilim"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => setSubmitting(true)}
                            >
                                Kayıt Ol
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/account/login" className={classes.link}>
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
};

export default Register;