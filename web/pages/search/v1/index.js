import React, { useState } from 'react';
import { getTimelines } from '../../../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import TimelineList from '../../../components/TimelineList';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const limit = 3;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}));

export default function Index({result}) {
  const classes = useStyles();

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

        <Tabs value={1} indicatorColor="primary" textColor="primary">
          <Tab label="Latest" component="a" href="/search" />
          <Tab label="v1（旧バージョン）" disabled />
        </Tabs>

        <TimelineList result={result} version="v1" limit={limit} />
      </Container>
    </>
  );
}


export async function getStaticProps(context) {
  const res = await getTimelines({version: 'v1', limit: limit});

  return {
    props: {
      result: res,
    },
    unstable_revalidate: 60,
  }
}
