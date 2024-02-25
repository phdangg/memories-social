import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import axios from "axios";


const App = () => {    
    const [clientId, setClientId] = useState(null);
    
    useEffect(()=>{
        axios.get("http://localhost:5000/client_id")
            .then((res)=>setClientId(res.data.client_id));
    },[clientId])      

    return (
        <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
            <Container maxWidth="lg">           
                <NavBar />
                <Routes>
                    <Route path="/" exact Component={Home}/>
                    <Route path="/auth" exact Component={Auth}/>
                </Routes>                
            </Container>
        </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;