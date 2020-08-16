import React, { useState, useEffect } from 'react';
import { getTimelines } from '../../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import TimelineList from '../../components/TimelineList';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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

        <Tabs value={0} indicatorColor="primary" textColor="primary">
          <Tab label="Latest" disabled />
          <Tab label="v1（旧バージョン）" component="a" href="/search/v1" />
        </Tabs>

        <TimelineList result={result} version="v2" limit={limit} />

        <Fab className={classes.fab} color="secondary" aria-label="add" component="a" href="/create">
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}


export async function getStaticProps(context) {
  const res = await getTimelines({version: 'v2', limit: limit});

  return {
    props: {
      result: res,
    },
    unstable_revalidate: 60,
  }
}
