import React, {useEffect} from 'react';
import DashboardLayout from "../DashboardLayout";
import {usePage} from "../PageContext";
import Liste from "../Liste";

const ServerList = () => {
    const [page, setPage] = usePage();

    useEffect(() => {
        setPage("servers");
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
            <Liste page={"Sunucular"} data={dummyData} />
        </DashboardLayout>
    );
};

export default ServerList;