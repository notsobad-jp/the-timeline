import React, { useState, useContext, useEffect } from 'react';
import { getTimelines } from '../../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../_app';
import TimelineList from '../../components/TimelineList';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
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

export default function Mypage() {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);

  const fetchTimelines = async () => {
    const res = await getTimelines({version: 'v2', limit: limit + 1, userId: user.uid});
    // 次のページがあればnextStartAfterにセット
    if(res.length == limit + 1) {
      res.shift(); // shift()で次ページ確認用のitemをitemsから消す
    }
    return res;
  }

  return (
    <>
      <Head>
        <title>Mypage - THE TIMELINE</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mypage
        </Typography>

        <Tabs value={0} indicatorColor="primary" textColor="primary">
          <Tab label="Latest" disabled />
          <Tab label="v1（旧バージョン）" component="a" href="/mypage/v1" />
        </Tabs>

        { user &&
          <TimelineList result={()=>{ fetchTimelines(); }} version="v2" limit={limit} userId={ user ? user.uid : null} />
        }

        { !user &&
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        }

        <Fab className={classes.fab} color="secondary" aria-label="add" component="a" href="/create">
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}
