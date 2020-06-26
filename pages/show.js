import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import { auth, firestore, firebase } from '../lib/firebase.js'
import csv from 'csvtojson'
import request from 'request'
import { DataSet, Timeline } from "vis-timeline/standalone";
import { useEffect } from 'react'


export default function Index({result}) {
  useEffect(() => {
    // Create a DataSet (allows two way data-binding)
    const items = new DataSet([
      { id: 1, content: "item 1", start: "2014-04-20" },
      { id: 2, content: "item 2", start: "2014-04-14" },
      { id: 3, content: "item 3", start: "2014-04-18" },
      { id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19" },
      { id: 5, content: "item 5", start: "2014-04-25" },
      { id: 6, content: "item 6", start: "2014-04-27", type: "point" }
    ]);

    // Configuration for the Timeline
    const options = {};

    // Create a Timeline
    const timeline = new Timeline(document.getElementById('target'), items, options);
  }, [])

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
      <div>{JSON.stringify(result)}</div>
      <div id='target'></div>
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
      result: result
    }
  }
}
