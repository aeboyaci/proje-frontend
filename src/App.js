import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from "./components/Account/Login/Login";
import Register from "./components/Account/Register/Register";
import {PageContext} from "./components/Dashboard/PageContext";
import Create from "./components/Dashboard/Create/Create";
import ServerList from "./components/Dashboard/Servers/ServerList";
import ClientList from "./components/Dashboard/Clients/ClientList";
import {AuthenticationContext} from "./components/Account/AuthenticationContext";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [page, setPage] = useState("create");

    return (
        <Router>
            <Switch>
                <Route path={"/"} exact={true}>
                    <Redirect push={true} from={"/"} to={"/account/login"} />
                </Route>
                <AuthenticationContext.Provider value={[token, setToken]}>
                    <Route path={"/account/login"} component={Login} exact={true} />
                    <Route path={"/account/register"} component={Register} exact={true} />
                    <PageContext.Provider value={[page, setPage]}>
                        <Route path={"/dashboard/create"} component={Create} exact={true} />
                        <Route path={"/dashboard/servers"} component={ServerList} exact={true} />
                        <Route path={"/dashboard/clients"} component={ClientList} exact={true} />
                    </PageContext.Provider>
                </AuthenticationContext.Provider>
            </Switch>
        </Router>
    );
};

export default App;