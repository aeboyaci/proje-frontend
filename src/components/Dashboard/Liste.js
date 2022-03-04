import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../Account/AuthenticationContext";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        flexBasis: '20%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const Liste = ({page, data}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState("panel1");

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [token, setToken] = useAuth();

    const download = (id, platform) => {
        let kind = page === "Sunucular" ? "server" : "client";
        fetch(`http://localhost:8001/api/download`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                id,
                kind,
            })
        }).then((resp) => resp.blob()).then((data) => {
            const link = document.createElement("a");
            link.style = "display: none;";
            let url = window.URL.createObjectURL(data);
            link.target = "_blank";

            if (platform === "windows") {
                link.download = kind + ".exe";
            }
            else {  // linux or darwin (MacOS)
                link.download = kind;
            }

            link.href = url;
            document.body.appendChild(link);
            link.click();
        }).catch((err) => console.error(err));
    };
    console.log("data", data);

    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    <Typography style={{marginBottom: "1.2rem"}} component={"h6"} variant={"h5"}><b>{page}</b></Typography>
                    {data ? (data.length > 0 ? data.map((data, i) => (
                        <Accordion expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${i + 1}bh-content`}
                                id={`panel${i + 1}bh-header`}
                            >
                                <Typography className={classes.heading}>Uzak Bağlantı Adresi: {data.remote_host}</Typography>
                                <Typography className={classes.heading}>Uzak Bağlantı Portu: {data.remote_port}</Typography>
                                <Typography className={classes.heading}>Platform: {data.platform}</Typography>
                                <Typography className={classes.heading}>Mimari: {data.arch === "amd64" ? "64-bit" : "32-bit"}</Typography>
                                <Typography className={classes.heading}>Oluşturulma Tarihi: {data.created_at_string}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container direction={"column"}>
                                    <Typography>
                                        Özellikler
                                    </Typography>
                                    <ul>
                                        <li>Encrypted communication</li>
                                        {data.functions.map((f) => <li>{f}</li>)}
                                    </ul>
                                    <Button onClick={() => download(data._id, data.platform)} style={{width: "100px", marginTop: "1.2rem"}} variant={"contained"} color={"primary"}>İndir</Button>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    )): <Typography component={"p"}>Henüz oluşturulmuş bir dosya yok.</Typography> )
                    : <Typography component={"p"}>Henüz oluşturulmuş bir dosya yok.</Typography>
                    }
                </CardContent>
            </Card>
        </div>
    );
};

export default Liste;