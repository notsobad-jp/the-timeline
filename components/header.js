import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TitleContext } from '../pages/_app';
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

export default function Header(){
  const classes = useStyles();
  const [user, setUser] = useState();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [title, setTitle] = useContext(TitleContext);

  firebase.auth().onAuthStateChanged((u) => {
    setUser(u);
  })

  const handleMenu = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      // return;
    }
    setDrawerOpened(open);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" className={classes.title}>
            { title }
          </Typography>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

          {(() => {
            if (user) {
              return user.email;
            } else {
              return <Button color="inherit">
                Login
              </Button>;
            }
          })()}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpened} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List className={classes.list}>
            <ListItem button component="a" href="/" key="home">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component="a" href="/timelines" key="search">
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem button component="a" href="/timelines/new" key="create">
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Create" />
            </ListItem>
            <ListItem button component="a" href="/mypage" key="mypage">
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Mypage" />
            </ListItem>
            <ListItem button component="a" href="/logout" key="logout">
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};
