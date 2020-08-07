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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/router'


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
  const router = useRouter();
  const [user, setUser] = useState();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [title, setTitle] = useContext(TitleContext);
  const [anchorEl, setAnchorEl] = useState(null);

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
      router.push(`/login`);
    });
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

          {(() => {
            if (user) {
              return(
                <>
                  <IconButton
                    aria-label="account of current user"
                    color="inherit"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleAccountMenuClick}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleAccountMenuClose}
                  >
                    <MenuItem onClick={handleAccountMenuClose}>Mypage</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
                </>
              );
            } else {
              return <Link color="inherit" href="/login">Login</Link>
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
