import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";

const App = () => {    

    return (
        <BrowserRouter>
            <Container maxWidth="lg">           
                <NavBar />
                <Switch>
                    <Route path="/" exact Component={Home}/>
                    <Route path="/auth" exact Component={Auth}/>
                </Switch>
                <Home/>
            </Container>
        </BrowserRouter>
    )
}

export default App;