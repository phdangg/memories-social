import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Icon from "./icon";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import axios from "axios";
import Input from "./Input";

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const switchMode = () => {
    setIsSignUp((preIsSignUp) => !preIsSignUp);
    handleShowPassword(false);
  }

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
            .then(res => res.data);
            console.log(userInfo)

          dispatch({type: "AUTH", data: userInfo})
        } catch (error) {
          console.log(error);
        }
      },
      onError: () => console.log("Login Failed"),
    });
  

  const handleShowPassword = () => setShowPassword((preShowPassword) => !preShowPassword);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>      
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <from className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
                isSignup && (
                  <>                  
                    <Input name='fistName' label='First Name' handleChange={handleChange} autoFocus half />
                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                  
                  </>
                )
            }
            <Input name="email" label="Email" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
          </Grid>
          <Button type="submit" fullWidth variant='contained' color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button 
                  className={classes.googleButton}
                  fullWidth 
                  variant='contained' color='primary' 
                  onClick={() => login()}                   
                  startIcon={<Icon/>}
                >
                  Google Sign In
          </Button>
          <Grid container justify='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign in': "Don't have an account? Sign up"}
                </Button>
              </Grid>
          </Grid>
        </from>
      </Paper>
    </Container>
  )
}

export default Auth