import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../../src/Link';
import { auth, firestore, firebase } from '../../lib/firebase.js'
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


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  }
}));

export default function Index({result}) {
  const classes = useStyles();
  const [items, setItems] = useState(result);
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

  return (
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
        <Tab label="v1（旧バージョン）" component="a" href="/timelines/v1" />
      </Tabs>

      <List component="nav">
        { items.map((item) => (
          <ListItem button divider component="a" href={`/v2/${item.id}`} key={item.id}>
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

      <Fab className={classes.fab} color="secondary" aria-label="add" component="a" href="/timelines/new">
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
  );
}


export async function getServerSideProps(context) {
  const result = await new Promise((resolve, reject) => {
    firestore.collection('v2').orderBy('createdAt', 'desc').limit(10).get()
      .then(snapshot => {
        let data = []
        snapshot.forEach(doc => {
          data.push(Object.assign({
            id: doc.id
          }, {
            title: doc.data().title,
            createdAt: doc.data().createdAt.toDate().toISOString().slice(0,10),
          }))
        })
        resolve(data)
      }).catch(error => {
        reject([])
      })
  })

  return {
    props: {
      result: result
    }
  }
}
