import React from 'react';
import Timeline from '../components/timeline';
import { sheetsToJson } from '../lib/timeline_utils';
import { auth, firestore, firebase } from '../lib/firebase.js'


export default function Index({data}) {
  return (
    <Timeline data={data} />
  );
}


export async function getServerSideProps(context) {
  const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKBGiTAL7Vh4PfnPWdqBOyWWqIZjRnyJ0Q_rTVckz9h8EjO432sTWhT7nUltBvWZawQ2MZsd9ZCfpO/pub?output=csv';
  // const url2 = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZTSb51geZ5Ix81cRxbYV6nYJ5qIbIjUpk42d1qDLfdg8C33EasNI-nXcaArcjbvjzqW8gx0bECZBF/pub?output=csv';
  const data = await sheetsToJson([url]);

  return {
    props: {
      data: data
    }
  }
}
