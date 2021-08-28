import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        flexBasis: '33.33%',
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

    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    <Typography style={{marginBottom: "1.2rem"}} component={"h6"} variant={"h5"}><b>{page}</b></Typography>
                    {data.map((data, i) => (
                        <Accordion expanded={expanded === `panel${i + 1}`} onChange={handleChange(`panel${i + 1}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${i + 1}bh-content`}
                                id={`panel${i + 1}bh-header`}
                            >
                                <Typography className={classes.heading}>Uzak Bağlantı Adresi: {data.remoteHost}</Typography>
                                <Typography className={classes.heading}>Uzak Bağlantı Portu: {data.remotePort}</Typography>
                                <Typography className={classes.heading}>Oluşturulma Tarihi: 28/08/2021</Typography>
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
                                    <Button style={{width: "100px", marginTop: "1.2rem"}} variant={"contained"} color={"primary"}>İndir</Button>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default Liste;