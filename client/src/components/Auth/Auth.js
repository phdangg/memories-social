import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const isSignup = false;

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

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
                    <Input name='fistName' label='First Name' handleChange={handleChange} half />
                  
                  </>
                )
            }
            <Input name="email" label="Email" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
          </Grid>
        </from>
      </Paper>
    </Container>
  )
}

export default Auth