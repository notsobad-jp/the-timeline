import React, { useState, useContext } from 'react';
import { firebase } from '../lib/firebase.js'
import { UserContext, SnackbarContext } from './_app';
import Head from 'next/head';

export default function Login() {
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'application/json')
  // res.end(JSON.stringify({ name: 'John Doe' }))
  const url = `http://localhost:3001${req.url}`;

  if (firebase.auth().isSignInWithEmailLink(url)) {
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    const email = "tomomichi.onishi@gmail.com"
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, url)
      .then(function(result) {
        // Clear email from storage.
        // window.localStorage.removeItem('emailForSignIn');
        console.log("authed!!")
        console.log(result.user)
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        res.end("successed!!!");
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        res.end("failed!!!");
      });
  }
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
