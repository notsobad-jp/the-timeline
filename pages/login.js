import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import { auth, firestore, firebase } from '../lib/firebase.js'
import { useEffect, useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { FacebookLoginButton, TwitterLoginButton, GoogleLoginButton } from "react-social-login-buttons";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

export default function Index() {
  const classes = useStyles();
  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged((user) => {
    setUser(user);
  })

  const snsLogin = (providerName) => {
    let provider;
    switch(providerName) {
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider();
        break;
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        break;
    }
    firebase.auth().signInWithRedirect(provider);
  }


  return (
    <Container maxWidth="lg">
      <Box my={8} align="center">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>ログイン</Typography>
            { user &&
              <div>{user.email}</div>
            }
            さん
          </Grid>
          <Grid item xs={12} sm={6}>
            <FacebookLoginButton onClick={() => { snsLogin('facebook') }} />
            <TwitterLoginButton onClick={() => { snsLogin('twitter') }} />
            <GoogleLoginButton onClick={() => { snsLogin('google') }} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
