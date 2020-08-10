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

  firebase.auth().onAuthStateChanged((u) => {
    setUser(u);
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


  const login = () => {
    const email = "tomomichi.onishi@gmail.com"
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'http://localhost:3000/api/auth',
      // This must be true.
      handleCodeInApp: true,
    };
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function() {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        console.log("sent email")
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
      });


    // console.log("email login")
    // const code = "Mdk9Lt6GEa80ZIX3m13NCgd0Yetf0c8bOyNllk-SlJ0AAAFzHsnX7A&apiKey=AIzaSyBKhIvS5oBGeiR7q_zLdAfTcT4-B3ags18"
    // // firebase.auth().sendPasswordResetEmail(email)
    // firebase.auth().verifyPasswordResetCode(code).then(function(email) {
    //   console.log("code verified")
    //   const newPassword = Math.random().toString(36).slice(-12)
    //   firebase.auth().confirmPasswordReset(code, newPassword).then(function(){
    //     console.log("password changed")
    //     firebase.auth().signInWithEmailAndPassword(email, newPassword)
    //   })
    // })
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
            <Button onClick={ login }>メールログイン</Button>
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
