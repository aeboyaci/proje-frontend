import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import {PageContext} from "./components/Dashboard/PageContext";
import Create from "./components/Dashboard/Create/Create";
import ServerList from "./components/Dashboard/Servers/ServerList";
import ClientList from "./components/Dashboard/Clients/ClientList";

const App = () => {
    const [page, setPage] = useState("create");

    return (
        <Router>
            <Switch>
                <Route path={"/account/login"} component={Login} exact={true} />
                <Route path={"/account/register"} component={Register} exact={true} />
                <PageContext.Provider value={[page, setPage]}>
                    <Route path={"/dashboard/create"} component={Create} exact={true} />
                    <Route path={"/dashboard/servers"} component={ServerList} exact={true} />
                    <Route path={"/dashboard/clients"} component={ClientList} exact={true} />
                </PageContext.Provider>
            </Switch>
        </Router>
    );
};

export default App;