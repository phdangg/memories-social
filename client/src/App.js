import React, { useEffect, useState } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getPosts } from "./actions/posts";

import useStyles from "./styles";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch]);

    return (
        <Container maxWidth="lg">           
            <NavBar />
            <Home/>
        </Container>
    )
}

export default App;