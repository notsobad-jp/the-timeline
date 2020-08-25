import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router'
import { UserContext, SnackbarContext } from './_app';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import { firebase } from '../lib/firebase.js'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';


const useStyles = makeStyles((theme) => ({
  twitterButton: {
    backgroundColor: 'rgb(90, 164, 235) !important',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '&:disabled': {
      opacity: 0.5,
    },
  },
  googleButton: {
    backgroundColor: 'rgb(203, 63, 34) !important',
    marginBottom: theme.spacing(1),
  },
}));

export default function Login() {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [user, setUser] = useContext(UserContext);
  const [snackbar, setSnackbar] = useContext(SnackbarContext);
  const [signinUrl, setSigninUrl] = useState();

  React.useEffect(() => {
    const url = `${window.location.protocol}//${window.location.host}/auth`;
    setSigninUrl(url);

    if(user && user.isAnonymous) { router.push(`/mypage`); }
  }, [user]);

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
            <Button type="submit" variant="contained" size="large" color="secondary" fullWidth={ isMobile }>ログイン</Button>
            <Box mt={2}>
              入力したメールアドレスに、ログインURLが届きます。
            </Box>
          </form>
        </Box>

        <Box my={8}>
          <Typography variant="h5" component="h1" gutterBottom>SNSログイン</Typography>
          <Button variant="contained" color="primary" className={classes.twitterButton} fullWidth={ isMobile } disabled={true} size="large" startIcon={<TwitterIcon />} onClick={()=>{snsLogin('twitter');}}>Twitterログイン</Button>
          <Button variant="contained" color="primary" className={classes.googleButton} fullWidth={ isMobile } size="large" onClick={()=>{snsLogin('google');}}>Googleログイン</Button>
          <Box mt={2}>
            もちろん勝手に投稿したりしませんのでご安心ください。
          </Box>
          <Box mt={2}>
            <Alert severity="warning">
              ベータ期間中はTwitterログインが使えません。すみませんが本リリースまでお待ちください。。
            </Alert>
          </Box>
        </Box>
      </Container>
    </>
  );
}
