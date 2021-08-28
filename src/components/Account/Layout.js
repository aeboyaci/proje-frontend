import React from 'react';
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundRepeat: 'no-repeat',
        backgroundColor: "#2c3040",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: "#c4c7d1"
    },
    brandName: {
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    center: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
}));

const Layout = ({children}) => {
    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image}>
                <div className={classes.brandName}>
                    <Typography component={"h1"} variant={"h1"}>
                        malware
                    </Typography>
                    <Typography style={{color: "#1E73BE"}} component={"h1"} variant={"h1"}>
                        .studio
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.center}>
                {children}
            </Grid>
        </Grid>
    );
};

export default Layout;