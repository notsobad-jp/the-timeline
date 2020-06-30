import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import { auth, firestore, firebase } from '../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
}));

export default function Index({result}) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Box my={8} align="center">
        <Typography variant="h3" component="h1" gutterBottom>
          年表でないと、伝えられないことがある。
        </Typography>
        <Typography gutterBottom>
          THE TIMELINE（ザ・タイムライン）は、
          簡単・便利な無料の年表作成サービスです。
        </Typography>
        <div>
          <Button variant="contained" color="secondary" size="large" className={classes.button} endIcon={<ChevronRightIcon />}>
            年表を作る
          </Button>
        </div>
      </Box>
      { result.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </Container>
  );
}


export async function getServerSideProps(context) {
  const result = await new Promise((resolve, reject) => {
    // firebase.firestore().collection('timelines').limit(10).get()
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
