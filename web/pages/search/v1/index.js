import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../../../src/Link';
import { auth, firestore, firebase } from '../../../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(10),
  },
  pagination: {
    marginTop: theme.spacing(2)
  }
}));

export default function Index({result, nextStartAt}) {
  const classes = useStyles();
  const [items, setItems] = useState(result);

  return (
    <>
      <Head>
        <title>Search(V1) - THE TIMELINE</title>
        <meta name="description" content="作成年表一覧(v1) - THE TIMELINE" />
        <link rel="canonical" href="https://the-timeline.jp/search/v1" />
      </Head>

      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search
        </Typography>

        <Tabs
          value={1}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Latest" component="a" href="/search" />
          <Tab label="v1（旧バージョン）" disabled />
        </Tabs>

        <List component="nav">
          { result.map((item) => (
            <ListItem button divider component="a" href={`/app/${item.id}`} target="_blank" rel="noopener" key={item.id}>
              <ListItemText primary={item.title} secondary={item.createdAt} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Box className={classes.pagination} display="flex" justifyContent="space-between">
          <Button onClick={()=>{ showNextPage(nextStartAt) }}>Prev</Button>
          {(() => {
            if (nextStartAt) {
              return(
                <Button onClick={()=>{ showNextPage(nextStartAt) }}>Next</Button>
              )
            }
          })()}
        </Box>
      </Container>
    </>
  );
}


export async function getStaticProps(context) {
  const limit = 10;
  let nextStartAt = null;

  const result = await new Promise((resolve, reject) => {
    firestore.collection('timelines').orderBy('createdAt', 'desc').limit(limit + 1).get()
      .then(snapshot => {
        if(snapshot.docs.length == limit + 1) {
          nextStartAt = snapshot.docs[limit].id;
        }
        let data = []
        snapshot.forEach(doc => {
          data.push(Object.assign({
            id: doc.id
          }, {
            title: doc.data().title,
            createdAt: doc.data().createdAt.toDate().toISOString().slice(0,10),
            gid: doc.data().gid,
          }))
        })
        resolve(data);
      }).catch(error => {
        reject([]);
      })
  })

  return {
    props: {
      result: result,
      nextStartAt: nextStartAt
    },
    unstable_revalidate: 60,
  }
}
