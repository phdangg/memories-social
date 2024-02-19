import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {    

    return (
        <BrowserRouter>
            <Container maxWidth="lg">           
                <NavBar />
                <Routes>
                    <Route path="/" exact Component={Home}/>
                    <Route path="/auth" exact Component={Auth}/>
                </Routes>
                <Home/>
            </Container>
        </BrowserRouter>
    )
}

export default App;