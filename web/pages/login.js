import React, { useState, useContext } from 'react';
import { UserContext } from './_app';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import { auth, firebase } from '../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { FacebookLoginButton, TwitterLoginButton, GoogleLoginButton } from "react-social-login-buttons";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

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


  const handleSubmit = (e) => {
    e.preventDefault();
    const emailField = document.getElementById('emailField');
    const email = emailField.value;
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: 'http://localhost:3001/api/auth',
      // This must be true.
      handleCodeInApp: true,
    };
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function() {
        console.log("sent email")
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
      });
  }


  return (
    <>
      <Head>
        <title>Login - THE TIMELINE</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Container maxWidth="sm">
        <Box my={8}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" component="h1" textAlign="center" gutterBottom>簡単ログイン</Typography>
            <Box mb={2}>
              <TextField id="emailField" type="email" label="Email" fullWidth />
            </Box>
          </form>
          <Button type="submit" variant="contained" color="secondary">ログイン</Button>
        </Box>

        <Box my={8}>
          <Typography variant="h5" component="h1" textAlign="center" gutterBottom>SNSログイン</Typography>
          <TwitterLoginButton onClick={() => { snsLogin('twitter') }} />
          <GoogleLoginButton onClick={() => { snsLogin('google') }} />
        </Box>

        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={()=>{ setSnackbar({open: false, message: ''}); }}
          message={snackbar.message}
          severity="success"
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{ setSnackbar({open: false, message: ''}); }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Container>
    </>
  );
}
