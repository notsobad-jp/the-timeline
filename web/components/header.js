import React, { useContext, useState } from 'react';
import { UserContext } from '../pages/_app';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoIcon: {
    marginRight: theme.spacing(1),
    verticalAlign: 'text-bottom',
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function Header(){
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [snackbarOpened, setSnackbarOpened] = useState(false);

  const logout = () => {
    firebase.auth().signOut().then(function() {
      setSnackbarOpened(true);
      router.push(`/login`);
    });
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" className={classes.title}>
            <Link href="/" color="inherit">
              <FormatAlignLeftIcon className={classes.logoIcon} />
              THE TIMELINE
            </Link>
          </Typography>

          {(() => {
            if (user) {
              return(
                <Tooltip title={user.email} aria-label={user.email}>
                  <IconButton
                    aria-label="account of current user"
                    color="inherit"
                    href="mypage"
                  >
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
              );
            } else {
              return <Link color="inherit" href="/login">Login</Link>
            }
          })()}

          <IconButton onClick={()=>{ setDrawerOpened(true) }} edge="end" color="inherit" aria-label="menu">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpened} onClose={()=>{ setDrawerOpened(false) }}>
        <div
          role="presentation"
          onClick={()=>{ setDrawerOpened(false) }}
          onKeyDown={()=>{ setDrawerOpened(false) }}
        >
          <List className={classes.list}>
            <ListItem button component="a" href="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component="a" href="/search">
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem button component="a" href="/create">
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Create" />
            </ListItem>
            <Divider className={classes.divider} />
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
        open={snackbarOpened}
        autoHideDuration={5000}
        onClose={()=>{ setSnackbarOpened(false); }}
        message="Logout successfully."
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{ setSnackbarOpened(false); }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};
