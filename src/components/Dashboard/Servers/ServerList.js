import React, {useEffect, useState} from 'react';
import DashboardLayout from "../DashboardLayout";
import {usePage} from "../PageContext";
import Liste from "../Liste";
import {useAuth} from "../../Account/AuthenticationContext";

const ServerList = () => {
    const [token, setToken] = useAuth();
    const [page, setPage] = usePage();

    const [data, setData] = useState([]);

    useEffect(() => {
        setPage("servers");
        fetch("http://localhost:8080/api/servers", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        }).then((resp) => resp.json()).then((d) => {
            console.log(d);
            setData(d.result);
        }).catch((err) => console.error(err));
    }, []);

    return (
        <DashboardLayout>
            <Liste page={"Sunucular"} data={data} />
        </DashboardLayout>
    );
};

export default ServerList;