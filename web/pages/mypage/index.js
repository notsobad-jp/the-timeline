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

export default function Mypage() {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [items, setItems] = useState([]);

  firebase.auth().onAuthStateChanged((u) => {
    setUser(u);
    if(!u) { return; }

    firestore.collection("v2").where("userId", "==", u.uid).orderBy('createdAt', 'desc').limit(10).get()
      .then(snapshot => {
        let data = []
        snapshot.forEach(doc => {
          data.push(Object.assign({
            id: doc.id
          }, {
            title: doc.data().title,
            createdAt: doc.data().createdAt.toDate().toISOString().slice(0,10),
            userId: doc.data().userId,
          }))
        })
        setItems(data);
        console.log(data);
      }).catch(error => {
        console.log(error);
      })
  });

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Mypage
      </Typography>

      <Tabs
        value={0}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Latest" disabled />
        <Tab label="v1（旧バージョン）" component="a" href="/mypage/v1" />
      </Tabs>

      <List component="nav">
        { items.map((item) => (
          <ListItem button divider component="a" href={`/timelines/${item.id}`} key={item.id}>
            <ListItemText primary={item.title} secondary={item.createdAt} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Fab className={classes.fab} color="secondary" aria-label="add" component="a" href="/timelines/new">
        <AddIcon />
      </Fab>
    </Container>
  );
}
