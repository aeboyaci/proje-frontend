import React, {useEffect, useState} from 'react';
import DashboardLayout from "../DashboardLayout";
import {
    Card, CardContent,
    createStyles,
    FormControl, FormHelperText,
    InputLabel, Select, Snackbar, Tooltip
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {usePage} from "../PageContext";
import {useAuth} from "../../Account/AuthenticationContext";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        innerContainer: {
          display: "flex",
          flexDirection: "row",
        },
        form: {
            width: '100%', // Fix IE 11 issue.
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }),
);

function ipv4(message = 'Geçersiz bir IP girildi.') {
    return this.matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
        message,
        excludeEmptyString: true
    }).test('ip', message, value => {
        return value === undefined || value.trim() === ''
            ? true
            : value.split('.').find(i => parseInt(i, 10) > 255) === undefined;
    });
}

Yup.addMethod(Yup.string, 'ipv4', ipv4);

const validationSchemaClient = Yup.object().shape({
    kind: Yup.string().required("Oluşturma türü boş bırakılamaz."),
    platform: Yup.string().required("Platform boş bırakılamaz."),
    arch: Yup.string().required("Mimari bilgisi boş bırakılamaz."),
    remote_host: Yup.string().ipv4().required("Uzak bağlantı adresi boş bırakılamaz."),
    remote_port: Yup.number().typeError("Port bilgisi geçersiz.").required("Uzak bağlantı portu boş bırakılamaz."),
});

const MalwareForm = () => {
    const classes = useStyles();
    const initialStateClient = {
        kind: "",
        platform: "",
        arch: "",
        remote_host: "",
        remote_port: "",
        reverse_shell: true,
        download: false,
        upload: false,
        screenshot: false,
    };

    const [token, _] = useAuth();
    const [snackbar, setSnackbar] = useState({open: false, success: false, message: ""});

    return (
        <Formik initialValues={initialStateClient} validationSchema={validationSchemaClient} onSubmit={(values, {validateForm, resetForm, setSubmitting}) => {
            validateForm().then(() => {
                let functions = [];
                for (let key in values)
                    if (typeof(values[key]) === "boolean" && values[key])
                        functions.push(key);

                fetch(`http://localhost:8001/api/create`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        kind: values.kind,
                        platform: values.platform,
                        arch: values.arch,
                        remote_host: values.remote_host,
                        remote_port: values.remote_port,
                        functions
                    })
                }).then((resp) => resp.json()).then((data) => {
                    resetForm();
                    setSubmitting(false);
                    setSnackbar({open: true, success: data.success, message: data.message});
                }).catch((err) => console.error(err));
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
                    <Snackbar anchorOrigin={{vertical: "top", horizontal: "right"}} open={snackbar.open} autoHideDuration={2250} onClose={() => setSnackbar({open: false, success: false, message: ""})}>
                        <Alert onClose={() => setSnackbar({open: false, success: false, message: ""})} severity={snackbar.success ? "success" : "error"}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                    <Grid item xs={12} sm={12} style={{marginBottom: "1.2rem"}}>
                        <Grid style={{marginBottom: ".4rem"}} item xs={12}>
                            <Typography color={"#2c3040"} variant={"subtitle1"} component={"h6"}>Genel Özellikler</Typography>
                        </Grid>
                        <FormControl error={Boolean(touched.kind && errors.kind)} style={{marginBottom: "1rem"}} fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="kind">Oluşturma Türü</InputLabel>
                            <Select
                                native
                                value={values.kind}
                                onChange={handleChange}
                                label="Oluşturma Türü"
                                onBlur={handleBlur}
                                inputProps={{
                                    name: 'kind',
                                    id: "kind"
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={"client"}>İstemci</option>
                                <option value={"server"}>Sunucu</option>
                                <option value={"both"}>İstemci ve Sunucu</option>
                            </Select>
                            <FormHelperText>{touched.kind && errors.kind}</FormHelperText>
                        </FormControl>
                        <FormControl error={Boolean(touched.platform && errors.platform)} style={{marginBottom: "1rem"}} fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="platform">Platform</InputLabel>
                            <Select
                                native
                                value={values.platform}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Platform"
                                inputProps={{
                                    name: 'platform',
                                    id: "platform"
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={"windows"}>Windows</option>
                                <option value={"linux"}>Linux</option>
                                <option value={"darwin"}>Mac OS</option>
                            </Select>
                            <FormHelperText>{touched.platform && errors.platform}</FormHelperText>
                        </FormControl>
                        <FormControl error={Boolean(touched.arch && errors.arch)} fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="arch">Mimari</InputLabel>
                            <Select
                                native
                                value={values.arch}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Mimari"
                                inputProps={{
                                    name: "arch",
                                    id: "arch"
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={"386"}>32-bit</option>
                                <option value={"amd64"}>64-bit</option>
                            </Select>
                            <FormHelperText>{touched.arch && errors.arch}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{marginBottom: "1.2rem"}}>
                        <Grid style={{marginBottom: ".4rem"}} item xs={12}>
                            <Typography color={"#2c3040"} variant={"subtitle1"} component={"h6"}>Host Bilgileri</Typography>
                        </Grid>
                        <Grid style={{marginBottom: "1rem"}} item xs={12}>
                            <TextField
                                name="remote_host"
                                variant="outlined"
                                fullWidth
                                label="Uzak Bağlantı Adresi"
                                value={values.remote_host}
                                error={Boolean(touched.remote_host && errors.remote_host)}
                                helperText={touched.remote_host && errors.remote_host}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Uzak Bağlantı Portu"
                                name="remote_port"
                                value={values.remote_port}
                                error={Boolean(touched.remote_port && errors.remote_port)}
                                helperText={touched.remote_port && errors.remote_port}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Grid style={{marginTop: ".4rem"}} item xs={12}>
                            <Typography color={"#2c3040"} variant={"subtitle1"} component={"h6"}>İstemci Özellikleri</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Tooltip title={"Her zararlı yazılımda bulunur."}>
                                <FormControlLabel
                                    disabled={true}
                                    control={
                                        <Checkbox
                                            checked={true}
                                            name="Encrypted communication"
                                            color="primary"
                                        />
                                    }
                                    label="Encrypted communication"
                                />
                            </Tooltip>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.reverse_shell}
                                        onChange={handleChange}
                                        name="reverse_shell"
                                        color="primary"
                                    />
                                }
                                label="Reverse shell"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.download}
                                        onChange={handleChange}
                                        name="download"
                                        color="primary"
                                    />
                                }
                                label="Download"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.upload}
                                        onChange={handleChange}
                                        name="upload"
                                        color="primary"
                                    />
                                }
                                label="Upload"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.screenshot}
                                        onChange={handleChange}
                                        name="screenshot"
                                        color="primary"
                                    />
                                }
                                label="Screenshot"
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
                        Oluştur
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

const Create = () => {
    const [page, setPage] = usePage();

    useEffect(() => {
        setPage("create");
    }, []);

    const classes = useStyles();

    return (
        <DashboardLayout>
            <div className={classes.root}>
                <Card>
                    <CardContent>
                        <Typography style={{marginBottom: "1.2rem"}} component={"h6"} variant={"h5"}><b>Oluştur</b></Typography>
                        <MalwareForm type={"client"} />
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Create;