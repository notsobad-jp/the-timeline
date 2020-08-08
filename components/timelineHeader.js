import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Link from '../src/Link';
import { auth, firestore, firebase } from '../lib/firebase.js'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/router'
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

export default function TimelineHeader({title}){
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = useState();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  firebase.auth().onAuthStateChanged((u) => {
    setUser(u);
  })

  const handleAccountMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    setDrawerOpened(open);
  };

  const logout = () => {
    firebase.auth().signOut().then(function() {
      setSnackbarOpen(true);
      router.push(`/login`);
    });
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" className={classes.title}>
            { title }
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpened} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List className={classes.list}>
            <ListItem button component="a" href="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component="a" href="/timelines">
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem button component="a" href="/timelines/new">
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Create" />
            </ListItem>
            {(() => {
              if (user) {
                return(
                  <>
                    <ListItem button component="a" href="/mypage">
                      <ListItemIcon><AccountCircle /></ListItemIcon>
                      <ListItemText primary="Mypage" />
                    </ListItem>
                    <ListItem button component="a" onClick={ logout } >
                      <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </>
                );
              } else {
                return(
                  <ListItem button component="a" href="/login">
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                );
              }
            })()}
          </List>
        </div>
      </Drawer>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={()=>{ setSnackbarOpen(false); }}
        message="Logout successfully."
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{ setSnackbarOpen(false); }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};
