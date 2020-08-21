import React, { useState, useContext } from 'react';
import { UserContext, SnackbarContext } from './_app';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import { firebase } from '../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FacebookLoginButton, TwitterLoginButton, GoogleLoginButton } from "react-social-login-buttons";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const [snackbar, setSnackbar] = useContext(SnackbarContext);
  const [signinUrl, setSigninUrl] = useState();

  React.useEffect(() => {
    const url = `${window.location.protocol}//${window.location.host}/auth`;
    setSigninUrl(url);
  });

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
      url: signinUrl,
      // This must be true.
      handleCodeInApp: true,
    };
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function() {
        window.localStorage.setItem('emailForSignIn', email);
        setSnackbar({open: true, message: "Email was sent to your E-mail address."})
      })
      .catch(function(error) {
        setSnackbar({open: true, message: "Failed to send email.. Please try again later."})
        console.log(error);
      });
  }
  const magicAuth = (e) => {
    e.preventDefault();
    const emailField = document.getElementById('emailField');
    const email = emailField.value;
    const newPassword = Math.random().toString(36).slice(-12)

    firebase.auth().createUserWithEmailAndPassword(email, newPassword).then(function(){
      //新規ユーザーの場合
      firebase.auth().sendPasswordResetEmail(email)
      setSnackbar({open: true, message: 'ログイン用のメールを送信しました。メール内のリンクをクリックしてログインしてください。'});
    }).catch(function(error) {
      //アドレスが既に登録済みの場合
      if(error.code == 'auth/email-already-in-use') {
        firebase.auth().sendPasswordResetEmail(email)
        setSnackbar({open: true, message: 'ログイン用のメールを送信しました。メール内のリンクをクリックしてログインしてください。'});
      //validationエラーなど
      }else {
        setSnackbar({open: true, message: error.message});
      }
    })
  }


  return (
    <>
      <Head>
        <title>Login - THE TIMELINE</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Container maxWidth="sm">
        <Box my={8}>
          <form onSubmit={magicAuth}>
            <Typography variant="h5" component="h1" gutterBottom>簡単ログイン</Typography>
            <Box mb={2}>
              <TextField id="emailField" type="email" label="Email" fullWidth />
            </Box>
            <Button type="submit" variant="contained" color="secondary">ログイン</Button>
            <Box mt={2}>
              入力したメールアドレスに、ログインURLが届きます。
            </Box>
          </form>
        </Box>

        <Box my={8}>
          <Typography variant="h5" component="h1" gutterBottom>SNSログイン</Typography>
          <TwitterLoginButton onClick={() => { snsLogin('twitter') }} />
          <GoogleLoginButton onClick={() => { snsLogin('google') }} />
          <Box mt={2}>
            もちろん勝手に投稿したりしませんのでご安心ください。
          </Box>
        </Box>
      </Container>
    </>
  );
}
