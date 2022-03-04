import React, {useEffect, useState} from 'react';
import Liste from "../Liste";
import DashboardLayout from "../DashboardLayout";
import {usePage} from "../PageContext";
import {useAuth} from "../../Account/AuthenticationContext";

const ClientList = () => {
    const [token, setToken] = useAuth();
    const [page, setPage] = usePage();

    const [data, setData] = useState([]);

    useEffect(() => {
        setPage("clients");
        fetch("http://localhost:8001/api/clients", {
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
            <Liste page={"İstemciler"} data={data} />
        </DashboardLayout>
    );
};

export default ClientList;