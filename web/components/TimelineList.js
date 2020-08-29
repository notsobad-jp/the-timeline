import React, { useState, useContext } from 'react';
import { SnackbarContext } from '../pages/_app';
import { getTimelines, deleteTimeline } from '../lib/firebase.js'
import { getTitleFromSheet } from '../lib/utils.js';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import SyncIcon from '@material-ui/icons/Sync';
import ErrorIcon from '@material-ui/icons/Error';


const useStyles = makeStyles((theme) => ({
  pagination: {
    marginTop: theme.spacing(2)
  },
  errorIcon: {
    verticalAlign: 'bottom',
    marginLeft: theme.spacing(1),
  },
}));

export default function TimelineList({result, limit, version, userId}) {
  const classes = useStyles();
  const [items, setItems] = useState(result);
  const initialStartAfter = result.length == limit ? result[result.length - 1].createdAt : null;
  const [startAfter, setStartAfter] = useState(initialStartAfter);
  const [endBefore, setEndBefore] = useState(null);
  const [snackbar, setSnackbar] = useContext(SnackbarContext);


  const remove = (id) => {
    const confirmed = confirm('Are you sure to delete this?');
    if(!confirmed){ return; }

    deleteTimeline(id).then(()=> {
      setItems(items.filter(i => i.id != id));
      setSnackbar({open: true, message: 'The item was deleted.'});
    }).catch(function(error) {
      console.error("Error removing document: ", error);
      setSnackbar({open: true, message: 'Failed to delete the item... Please try again later.'});
    });
  }

  const showNextPage = async (at) => {
    const res = await getTimelines({version: version, limit: limit + 1, startAfter: at}); // 1つ多く取得して次ページあるか確認

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
    const res = await getTimelines({version: version, limit: limit + 1, endBefore: at}); // 1つ多く取得して次ページあるか確認

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
      <List component="nav">
        { items.map((item) => (
          <ListItem button divider component="a" href={(item.version=='v2') ? `${process.env.NEXT_PUBLIC_APP_ROOT}/${item.id}` : `https://the-timeline.jp/timelines/${item.id}`} target='_blank' key={item.id}>
            <ListItemText primary={
                <>
                  { item.title }
                  {
                    item.version != 'v2' && userId &&
                    <Tooltip title="Outdated!" aria-label="outdated">
                      <ErrorIcon color="action" className={classes.errorIcon} />
                    </Tooltip>
                  }
                </>
              } secondary={item.createdAt.slice(0, 10)} />
            <ListItemSecondaryAction>
              { userId &&
                <>
                  <Tooltip title="Delete" aria-label="Delete">
                    <IconButton edge="end" aria-label="delete" onClick={()=>{remove(item.id)}}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </>
              }
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
    </>
  );
}
