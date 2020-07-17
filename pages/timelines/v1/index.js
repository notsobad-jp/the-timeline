import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../../../src/Link';
import { auth, firestore, firebase } from '../../../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const useStyles = makeStyles((theme) => ({
}));

export default function Index({result}) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        みんなの年表(v1)
      </Typography>
      { result.map((item) => (
        <Link key={item.id} href="/timelines/[id]" as={`/timelines/${item.id}`}>
          {item.title}
        </Link>
      ))}
    </Container>
  );
}


export async function getServerSideProps(context) {
  const result = await new Promise((resolve, reject) => {
    firestore.collection('timelines').limit(10).get()
      .then(snapshot => {
        let data = []
        snapshot.forEach(doc => {
          data.push(Object.assign({
            id: doc.id
          }, {title: doc.data().title}))
        })
        resolve(data)
      }).catch(error => {
        reject([])
      })
  })

  return {
    props: {
      result: result
    }
  }
}
