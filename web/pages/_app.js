import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { auth, firestore, firebase } from '../lib/firebase.js'
import Header from "../components/header.js"
import Snackbar from "../components/snackbar.js"
import { useRouter } from 'next/router'


export const UserContext = createContext(["", () => {}]);
export const SnackbarContext = createContext(["", () => {}]);

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter()
  const [user, setUser] = useState();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  firebase.auth().onAuthStateChanged((u) => {
    setUser(u);
  })


  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>THE TIMELINE | 無料年表作成サービス</title>
        <meta name="description" content="THE TIMELINE(ザ・タイムライン)は、簡単・便利な無料の年表作成サービスです" />
        <meta name="keywords" content="年表,作成,無料,時系列,歴史,ツール,サービス,フリー,ソフト,アプリ,エクセル,自分史,作り方,タイムライン,THE TIMELINE" />
        <meta property="og:title" content="簡単・便利な無料の年表作成サービス | THE TIMELINE(ザ・タイムライン)" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://the-timeline.jp" />
        <meta property="og:image" content="https://the-timeline.jp/img/sample.png" />
        <meta property="og:site_name" content="簡単・便利な無料の年表作成サービス | THE TIMELINE(ザ・タイムライン)" />
        <meta property="og:description" content="THE TIMELINE(ザ・タイムライン)は、簡単・便利な無料の年表作成サービスです" />
        <meta property="og:locale" content="ja_JP" />
      </Head>

      <ThemeProvider theme={theme}>
        <UserContext.Provider value={[user, setUser]}>
          <SnackbarContext.Provider value={[snackbar, setSnackbar]}>
            <CssBaseline />
            <Header />
            <Container maxWidth="md">
              <Component {...pageProps} />
            </Container>
            <Snackbar />
          </SnackbarContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
