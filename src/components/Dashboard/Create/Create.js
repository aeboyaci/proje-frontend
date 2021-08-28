import React, {useEffect} from 'react';
import DashboardLayout from "../DashboardLayout";
import {
    Card, CardContent,
    createStyles,
    FormControl, FormHelperText,
    InputLabel, Select, Tooltip
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
    type: Yup.string().required("Oluşturma türü boş bırakılamaz."),
    platform: Yup.string().required("Platform boş bırakılamaz."),
    remoteHost: Yup.string().ipv4().required("Uzak bağlantı adresi boş bırakılamaz."),
    remotePort: Yup.number().typeError("Port bilgisi geçersiz.").required("Uzak bağlantı portu boş bırakılamaz."),
})

const MalwareForm = ({type}) => {
    const classes = useStyles();
    const initialStateClient = {
        type: "",
        platform: "",
        remoteHost: "",
        remotePort: "",
        reverseShell: true,
        download: false,
        upload: false,
        screenshot: false,
        fileCrypto: false,
    };

    return (
        <Formik initialValues={initialStateClient} validationSchema={validationSchemaClient} onSubmit={(values, {validateForm, resetForm, setSubmitting}) => {
            validateForm().then(() => {
                console.log(values);
                resetForm();
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
                    <Grid item xs={12} sm={12} style={{marginBottom: "1.2rem"}}>
                        <Grid style={{marginBottom: ".4rem"}} item xs={12}>
                            <Typography color={"#2c3040"} variant={"subtitle1"} component={"h6"}>Genel Özellikler</Typography>
                        </Grid>
                        <FormControl error={Boolean(touched.type && errors.type)} style={{marginBottom: "1rem"}} fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Oluşturma Türü</InputLabel>
                            <Select
                                native
                                value={values.type}
                                onChange={handleChange}
                                label="Oluşturma Türü"
                                onBlur={handleBlur}
                                inputProps={{
                                    name: 'type',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={"client"}>İstemci</option>
                                <option value={"server"}>Sunucu</option>
                                <option value={"both"}>İstemci ve Sunucu</option>
                            </Select>
                            <FormHelperText>{touched.type && errors.type}</FormHelperText>
                        </FormControl>
                        <FormControl error={Boolean(touched.platform && errors.platform)} fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Platform</InputLabel>
                            <Select
                                native
                                value={values.platform}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Platform"
                                inputProps={{
                                    name: 'platform',
                                    id: 'outlined-age-native-simple-2',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={"windows"}>Windows</option>
                                <option value={"linux"}>Linux</option>
                                <option value={"osx"}>Mac OS</option>
                            </Select>
                            <FormHelperText>{touched.platform && errors.platform}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{marginBottom: "1.2rem"}}>
                        <Grid style={{marginBottom: ".4rem"}} item xs={12}>
                            <Typography color={"#2c3040"} variant={"subtitle1"} component={"h6"}>Host Bilgileri</Typography>
                        </Grid>
                        <Grid style={{marginBottom: "1rem"}} item xs={12}>
                            <TextField
                                name="remoteHost"
                                variant="outlined"
                                fullWidth
                                label="Uzak Bağlantı Adresi"
                                value={values.remoteHost}
                                error={Boolean(touched.remoteHost && errors.remoteHost)}
                                helperText={touched.remoteHost && errors.remoteHost}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Uzak Bağlantı Portu"
                                name="remotePort"
                                value={values.remotePort}
                                error={Boolean(touched.remotePort && errors.remotePort)}
                                helperText={touched.remotePort && errors.remotePort}
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
                                        checked={values.reverseShell}
                                        onChange={handleChange}
                                        name="reverseShell"
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.fileCrypto}
                                        onChange={handleChange}
                                        name="fileCrypto"
                                        color="primary"
                                    />
                                }
                                label="File encryption/decryption"
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