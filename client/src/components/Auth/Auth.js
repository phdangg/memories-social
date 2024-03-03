import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Icon from "./icon";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import axios from "axios";
import Input from "./Input";
import { signIn, signUp } from "../../actions/auth";
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch ();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignup) {
      dispatch(signUp(formData,navigate));
      
    }
    else {
      dispatch(signIn(formData,navigate));
      
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});

  }

  const switchMode = () => {
    setIsSignUp((preIsSignUp) => !preIsSignUp);
    setShowPassword(false);
  }

    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          const userInfo = await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
            .then(res => res.data);            

          dispatch({type: "AUTH", data: userInfo})
          navigate('/');
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
        <form className={classes.form} onSubmit={handleSubmit}>
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
        </form>
      </Paper>
    </Container>
  )
}

export default Auth