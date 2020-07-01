import React from 'react';
import Timeline from '../../components/timeline';
import { sheetsToJson } from '../../lib/timeline_utils';
import { auth, firestore, firebase } from '../../lib/firebase.js'


export default function Index({data}) {
  return (
    <Timeline data={data} />
  );
}


export async function getStaticProps({params}) {
  const result = await new Promise((resolve, reject) => {
    firestore.collection('v2').doc(params.id).get()
      .then(doc => {
        if (doc.exists) {
          resolve(doc.data())
        } else {
          reject([])
        }
      }).catch(error => {
        reject([])
      })
  })
  const data = await sheetsToJson(result.sources);

  return {
    props: {
      data: data
    }
  }
}

export async function getStaticPaths() {
  const paths = await new Promise((resolve, reject) => {
    firestore.collection('v2').limit(10).get()
      .then(snapshot => {
        let data = []
        snapshot.forEach(doc => {
          data.push({params: {id: doc.id}})
        })
        resolve(data)
      }).catch(error => {
        reject([])
      })
  })

  return {
    paths,
    fallback: false
  }
}
