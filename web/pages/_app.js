import React, { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router'
import theme from '../src/theme';
import { firebase } from '../lib/firebase.js'
import * as gtag from '../lib/gtag'
import Head from 'next/head';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from "../components/header.js"
import Footer from "../components/footer.js"
import Snackbar from "../components/snackbar.js"


export const UserContext = createContext(["", () => {}]);
export const SnackbarContext = createContext(["", () => {}]);

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter()
  const [user, setUser] = useState();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Google Analytics
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)

    // Google Adsense
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, []);

  firebase.auth().onAuthStateChanged((u) => {
    setUser(u);
  })


  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <title>THE TIMELINE | 無料年表作成サービス</title>
        <meta name="description" content="THE TIMELINE(ザ・タイムライン)は、簡単・便利な無料の年表作成サービスです" />
        <meta name="keywords" content="年表,作成,無料,時系列,歴史,ツール,サービス,フリー,ソフト,アプリ,エクセル,自分史,作り方,タイムライン,THE TIMELINE" />
        <meta property="og:title" content="簡単・便利な無料の年表作成サービス | THE TIMELINE(ザ・タイムライン)" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_WEB_ROOT}`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_WEB_ROOT}/images/top/sample.png`} />
        <meta property="og:site_name" content="簡単・便利な無料の年表作成サービス | THE TIMELINE(ザ・タイムライン)" />
        <meta property="og:description" content="THE TIMELINE(ザ・タイムライン)は、簡単・便利な無料の年表作成サービスです" />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content="THE TIMELINE(ザ・タイムライン)は、簡単・便利な無料の年表作成サービスです" />
        <meta name="twitter:image:src" content={`${process.env.NEXT_PUBLIC_WEB_ROOT}/images/top/sample.png`} />
      </Head>

      <ThemeProvider theme={theme}>
        <UserContext.Provider value={[user, setUser]}>
          <SnackbarContext.Provider value={[snackbar, setSnackbar]}>
            <CssBaseline />
            <Header />
            <Container maxWidth="md" style={{minHeight: 500, paddingTop: theme.spacing(4)}}>
              <Component {...pageProps} />

              <Box my={8}>
                <ins className="adsbygoogle"
                  style={{display: "block"}}
                  data-ad-client="ca-pub-7840479109197513"
                  data-ad-slot="3362221472"
                  data-ad-format="auto"
                  data-full-width-responsive="true">
                </ins>
              </Box>
            </Container>
            <Footer />
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
