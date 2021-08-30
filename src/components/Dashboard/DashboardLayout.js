import React, {useEffect, useState} from 'react';
import "./dashboard.css";
import Typography from "@material-ui/core/Typography";
import $ from "jquery";
import {Grid, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddIcon from '@material-ui/icons/Add';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {usePage} from "./PageContext";
import {useHistory} from "react-router-dom";
import {useAuth} from "../Account/AuthenticationContext";


const DashboardLayout = ({children}) => {
    const [open, setOpen] = useState(true);
    const history = useHistory();
    const [token, setToken] = useAuth();
    const [page, setPage] = usePage();

    const hamburgerClick = (e) => {
        let newOpenValue = !open;
        setOpen(newOpenValue);

        $("#sidebar").animate({
            width: `${newOpenValue ? "300px" : "75px"}`,
        }, {
            duration: 650,
        });
        $("#brand").animate({
            width: `${newOpenValue ? "244px": "0"}`,
        }, {
            duration: 650,
        });
        $("#main").animate({
            marginLeft: `${newOpenValue ? "300px" : "75px"}`,
        }, {
            duration: 650,
        })
        setTimeout(() => {
            if (!newOpenValue)
                $("#brand h1").css("display", "none");
        }, 640);
        if (newOpenValue)
            $("#brand h1").removeAttr("style");
    };

    useEffect(() => {
        if (!token)
            history.push("/account/login");
    }, []);

    return (
        <React.Fragment>
            <div id={"sidebar"}>
                <div className={"brand-name"}>
                    <div id={"brand"} style={{display: "flex", alignItems: "center"}}>
                        <Typography component={"h1"} variant={"h4"}>
                            malware
                        </Typography>
                        <Typography className={"blue-text"} component={"h1"} variant={"h4"}>
                            .studio
                        </Typography>
                    </div>
                    <div onClick={hamburgerClick} className={"hamburger-container"}>
                        <div className={"hamburger-icon"}/>
                        <div className={"hamburger-icon"}/>
                        <div className={"hamburger-icon"}/>
                    </div>
                </div>
                <div className={"sep"}/>
                <div style={{marginLeft: "10px"}}>
                    <List>
                        <div>
                            <ListItem onClick={() => {setPage("create"); history.push("/dashboard/create")}} style={{backgroundColor: `${page === "create" ? "#1A5591" : ""}`}} button>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="Oluştur" />
                            </ListItem>
                            <ListItem onClick={() => {setPage("servers"); history.push("/dashboard/servers")}} style={{backgroundColor: `${page === "servers" ? "#1A5591" : ""}`}} button>
                                <ListItemIcon>
                                    <FormatListBulletedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sunucular" />
                            </ListItem>
                            <ListItem onClick={() => {setPage("clients"); history.push("/dashboard/clients")}} style={{backgroundColor: `${page === "clients" ? "#1A5591" : ""}`}} button>
                                <ListItemIcon>
                                    <ListAltIcon />
                                </ListItemIcon>
                                <ListItemText primary="İstemciler" />
                            </ListItem>
                            <ListItem onClick={() => { setToken(null); history.push("/account/login"); } } button>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Çıkış Yap" />
                            </ListItem>
                        </div>
                    </List>
                </div>
            </div>
            <div id={"main"}>
                <Grid className={"container"}>
                    {children}
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default DashboardLayout;