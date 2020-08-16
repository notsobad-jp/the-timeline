import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../../../src/Link';
import { getTimelines } from '../../../lib/firebase.js'
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


const limit = 3;

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(10),
  },
  pagination: {
    marginTop: theme.spacing(2)
  }
}));

export default function Index({result, nextStartAfter, prevEndBefore}) {
  const classes = useStyles();
  const [items, setItems] = useState(result);
  const [startAfter, setStartAfter] = useState(nextStartAfter);
  const [endBefore, setEndBefore] = useState(prevEndBefore);

  const showNextPage = async (at) => {
    const res = await getTimelines({version: 'v1', limit: limit + 1, startAfter: at}); // 1つ多く取得して次ページあるか確認

    // 次のページがあればnextStartAfterにセット
    if(res.length == limit + 1) {
      res.pop(); // pop()で次ページ確認用のitemをitemsから消す
      setStartAfter(res[limit-1].createdAt);
    }else {
      setStartAfter(null);
    }
    setEndBefore(res[0].createdAt);
    setItems(res);
  }

  const showPrevPage = async (at) => {
    const res = await getTimelines({version: 'v1', limit: limit + 1, endBefore: at}); // 1つ多く取得して次ページあるか確認

    // 次のページがあればnextStartAfterにセット
    if(res.length == limit + 1) {
      res.shift(); // shift()で次ページ確認用のitemをitemsから消す
      setEndBefore(res[0].createdAt);
    }else {
      setEndBefore(null);
    }
    setStartAfter(res[res.length-1].createdAt);
    setItems(res);
  }

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
          { items.map((item) => (
            <ListItem button divider component="a" href={`/app/${item.id}`} target="_blank" rel="noopener" key={item.id}>
              <ListItemText primary={item.title} secondary={item.createdAt.slice(0, 10)} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Box className={classes.pagination} display="flex" justifyContent="space-between">
          { endBefore &&
            <Box flexGrow={1} textAlign="left">
              <Button onClick={()=>{ showPrevPage(endBefore) }}>Prev</Button>
            </Box>
          }
          { startAfter &&
            <Box flexGrow={1} textAlign="right">
              <Button onClick={()=>{ showNextPage(startAfter) }}>Next</Button>
            </Box>
          }
        </Box>
      </Container>
    </>
  );
}


export async function getStaticProps(context) {
  const res = await getTimelines({version: 'v1', limit: limit + 1}); // 1つ多く取得して次ページあるか確認

  // 次のページがあればnextStartAfterにセット
  let nextStartAfter = null;
  if(res.length == limit + 1) {
    res.pop(); // pop()で次ページ確認用のitemをitemsから消す
    nextStartAfter = res[limit-1].createdAt;
  }

  return {
    props: {
      result: res,
      nextStartAfter: nextStartAfter,
      prevEndBefore: null
    },
    unstable_revalidate: 60,
  }
}
