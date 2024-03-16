import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, redirect, Navigate  } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import axios from "axios";


const App = () => {    
    const [clientId, setClientId] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile'));
    
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
                    <Route path="/" exact element={<Navigate to="/posts" />} />
                    <Route path="/posts" exact Component={Home}/>
                    <Route path="/posts/search" exact Component={Home}/>
                    <Route path="/posts/:id" Component={PostDetails}/>
                    <Route path="/auth" exact Component={()=>(!user ? <Auth/> : <Navigate to="/posts" />)}/>
                </Routes>                
            </Container>
        </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;