import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import { auth, firestore, firebase } from '../lib/firebase.js'
import Csv from 'csv-parser'
import fs from 'fs'
import csv from 'csvtojson'
import Papa from "papaparse";
import request from 'request'


export default function Index({result}) {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
        <div>{result}</div>
    </Container>
  );
}


export async function getServerSideProps(context) {
  const result = await new Promise((resolve, reject) => {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKBGiTAL7Vh4PfnPWdqBOyWWqIZjRnyJ0Q_rTVckz9h8EjO432sTWhT7nUltBvWZawQ2MZsd9ZCfpO/pub?output=csv';
    csv()
      .fromStream(request.get(url))
      .then((json)=>{
        console.log(json);
        resolve(json)
        // long operation for each json e.g. transform / write into database.
      });
  })

  return {
    props: {
      result: 'a'
    }
  }
}
