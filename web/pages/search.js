import React, { useState, useEffect } from 'react';
import { getTimelines } from '../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import Link from '../src/Link';
import TimelineList from '../components/TimelineList';
import Head from 'next/head';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';


const limit = 10;

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontWeight: 'bold',
    '& svg': {
      verticalAlign: 'text-bottom',
      marginRight: theme.spacing(1),
    },
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
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_ROOT}/search`} />
      </Head>

      <div>
        <Typography variant="h5" component="h1" gutterBottom className={classes.pageTitle}>
          <SearchIcon />
          みんなの年表
        </Typography>

        <TimelineList result={result} limit={limit} />

        <Fab className={classes.fab} color="secondary" aria-label="add" component={Link} href="/create">
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}


export async function getStaticProps(context) {
  const res = await getTimelines({limit: limit});

  return {
    props: {
      result: res,
    },
    unstable_revalidate: 60,
  }
}
