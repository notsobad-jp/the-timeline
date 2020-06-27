import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Timeline from '../components/timeline';
import { sheetsToJson } from '../lib/timeline_utils';
import { auth, firestore, firebase } from '../lib/firebase.js'


export default function Index({data}) {
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
      <Timeline data={data} />
    </Container>
  );
}


export async function getServerSideProps(context) {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKBGiTAL7Vh4PfnPWdqBOyWWqIZjRnyJ0Q_rTVckz9h8EjO432sTWhT7nUltBvWZawQ2MZsd9ZCfpO/pub?output=csv';
  const url2 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZTSb51geZ5Ix81cRxbYV6nYJ5qIbIjUpk42d1qDLfdg8C33EasNI-nXcaArcjbvjzqW8gx0bECZBF/pub?output=csv';
  const data = await sheetsToJson([url, url2]);

  return {
    props: {
      data: data
    }
  }
}
