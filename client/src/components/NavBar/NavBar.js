import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import memories from "../../images/memories.png"

const NavBar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        // JWT
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);    

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    }

    return (        
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>        
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.name} src={user.picture}>{user.family_name}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.name ? user.name : user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color='primary'>Sign in</Button>
                )} 
            </Toolbar>
        </AppBar>
    );
}

export default NavBar