import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { SnackbarContext } from './_app';
import { firebase } from '../lib/firebase.js';
import Head from 'next/head';

export default function Auth() {
  const router = useRouter();
  const [snackbar, setSnackbar] = useContext(SnackbarContext);

  React.useEffect(() => {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
        window.localStorage.setItem('emailForSignIn', email);
      }
      // The client SDK will parse the code from the link for you.
      firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(function(result) {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          setSnackbar({open: true, message: `Signin successfully!`});
          router.push("/mypage");
        })
        .catch(function(error) {
          setSnackbar({open: true, message: 'Signin failed.. Please try again later.'});
          router.push("/login");
        });
    }
  });

  return (
    <>
      <Head>
        <title>Auth - THE TIMELINE</title>
        <meta name="robots" content="noindex" />
      </Head>
    </>
  );
}
