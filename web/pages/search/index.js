import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../../src/Link';
import { getTimelines } from '../../lib/firebase.js'
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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import SyncIcon from '@material-ui/icons/Sync';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import { getTitleFromSheet } from '../../lib/utils.js';


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
  pagination: {
    marginTop: theme.spacing(2)
  }
}));

export default function Index({result, nextStartAfter, prevEndBefore}) {
  const classes = useStyles();
  const [items, setItems] = useState(result);
  const [startAfter, setStartAfter] = useState(nextStartAfter);
  const [endBefore, setEndBefore] = useState(prevEndBefore);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  const deleteTimeline = (id) => {
    const confirmed = confirm('Are you sure to delete this?');
    if(!confirmed){ return; }

    firestore.collection('v2').doc(id).delete().then(function() {
      setItems(items.filter(i => i.id != id));
      setSnackbar({open: true, message: 'The item was deleted.'});
    }).catch(function(error) {
      console.error("Error removing document: ", error);
      setSnackbar({open: true, message: 'Failed to delete the item... Please try again later.'});
    });
  }

  const syncTitle = async (id) => {
    try {
      const title = await getTitleFromSheet(id);
      firestore.collection('v2').doc(id).update({title: title}).then(function() {
        items.find(i => i.id == id).title = title;
        setItems(items);
        setSnackbar({open: true, message: 'The title was updated.'});
      }).catch(function(error) {
        console.error("Error updating document: ", error);
        setSnackbar({open: true, message: 'Failed to update the title... Please try again later.'});
      });
    } catch(e) {
      console.log(e);
      setSnackbar({open: true, message: e});
    }
  }

  const showNextPage = async (at) => {
    const res = await getTimelines({version: 'v2', limit: limit + 1, startAfter: at}); // 1つ多く取得して次ページあるか確認

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
    const res = await getTimelines({version: 'v2', limit: limit + 1, endBefore: at}); // 1つ多く取得して次ページあるか確認

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
        <title>Search - THE TIMELINE</title>
        <meta name="description" content="作成年表一覧 - THE TIMELINE" />
        <link rel="canonical" href="https://the-timeline.jp/search" />
      </Head>

      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" component="h1" gutterBottom>
          Search
        </Typography>

        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Latest" disabled />
          <Tab label="v1（旧バージョン）" component="a" href="/search/v1" />
        </Tabs>

        <List component="nav">
          { items.map((item) => (
            <ListItem button divider component="a" href={`/app/v2/${item.id}`} key={item.id}>
              <ListItemText primary={item.title} secondary={item.createdAt} />
              <ListItemSecondaryAction>
                <Tooltip title="Sync Title" aria-label="Sync Title">
                  <IconButton edge="start" aria-label="sync-title" onClick={()=>{syncTitle(item.id)}}>
                    <SyncIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" aria-label="Delete">
                  <IconButton edge="end" aria-label="delete" onClick={()=>{deleteTimeline(item.id)}}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Show" aria-label="Show">
                  <IconButton edge="end" aria-label="show">
                    <ChevronRightIcon />
                  </IconButton>
                </Tooltip>
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

        <Fab className={classes.fab} color="secondary" aria-label="add" component="a" href="/create">
          <AddIcon />
        </Fab>

        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={()=>{ setSnackbar({open: false, message: ''}); }}
          message={snackbar.message}
          severity="success"
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{ setSnackbar({open: false, message: ''}); }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Container>
    </>
  );
}


export async function getStaticProps(context) {
  const res = await getTimelines({version: 'v2', limit: limit + 1}); // 1つ多く取得して次ページあるか確認

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
