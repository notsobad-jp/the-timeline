import React, { useState, useEffect } from 'react';
import { getTimelines } from '../../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import TimelineList from '../../components/TimelineList';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const limit = 10;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

export default function Index({result}) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Search - THE TIMELINE</title>
        <meta name="description" content="作成年表一覧 - THE TIMELINE" />
        <link rel="canonical" href="https://the-timeline.jp/search" />
      </Head>

      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search
        </Typography>

        <TimelineList result={result} limit={limit} />

        <Fab className={classes.fab} color="secondary" aria-label="add" component="a" href="/create">
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}


export async function getStaticProps(context) {
  const res = await getTimelines({limit: limit});
  console.log(res)

  return {
    props: {
      result: res,
    },
    unstable_revalidate: 60,
  }
}
