import React, { useState, useContext, useEffect } from 'react';
import { getTimelines } from '../../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../_app';
import TimelineList from '../../components/TimelineList';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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
  const [items, setItems] = useState([]);

  useEffect(() => {
    let ignore = false;
    if(!user) { return; }
    const fetchData = async () => {
      const res = await getTimelines({version: 'v2', limit: limit, userId: user.uid});
      if(!ignore) { setItems(res); }
    }
    fetchData();
    return () => { ignore = true; }
  }, [user] )


  return (
    <>
      <Head>
        <title>Mypage - THE TIMELINE</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4"  component="h1" gutterBottom>
          Mypage
        </Typography>

        { items.length > 0 &&
          <TimelineList result={items} limit={limit} userId={user.uid} />
        }

        { !user && items &&
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
