import React, {useEffect} from 'react';
import Liste from "../Liste";
import DashboardLayout from "../DashboardLayout";
import {usePage} from "../PageContext";

const ClientList = () => {
    const [page, setPage] = usePage();

    useEffect(() => {
        setPage("clients");
    }, []);

    const dummyData = [
        {
            remoteHost: "127.0.0.1",
            remotePort: "4443",
            functions: ["Download", "Upload"]
        },
        {
            remoteHost: "127.0.0.1",
            remotePort: "8080",
            functions: ["Download", "Upload", "File encryption/decryption"]
        },
    ];

    return (
        <DashboardLayout>
            <Liste page={"İstemciler"} data={dummyData} />
        </DashboardLayout>
    );
};

export default ClientList;