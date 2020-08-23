import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext, SnackbarContext } from '../pages/_app';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#000',
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
  chip: {
    marginLeft: theme.spacing(1),
    verticalAlign: 'text-bottom',
  },
}));

export default function Header(){
  const classes = useStyles();
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);
  const [snackbar, setSnackbar] = useContext(SnackbarContext);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const logout = () => {
    firebase.auth().signOut().then(function() {
      setSnackbar({open: true, message: 'ログアウトしました'});
      router.push(`/login`);
    });
  };


  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" component="h1" className={classes.title}>
            <Link href="/" color="inherit">
              <FormatAlignLeftIcon color="primary" className={classes.logoIcon} />
              THE TIMELINE
            </Link>
            <Chip className={classes.chip} label="Ver.2" size="small" />
          </Typography>

          <Hidden smDown>
            {(() => {
              if (user) {
                const displayName = user.isAnonymous ? 'ゲストユーザー' : user.email;
                return(
                  <Tooltip title={displayName} aria-label={displayName}>
                    <IconButton aria-label="account of current user" color="inherit" href="/mypage">
                      <AccountCircle />
                    </IconButton>
                  </Tooltip>
                );
              } else {
                return <Link color="inherit" href="/login">Login</Link>
              }
            })()}
          </Hidden>

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
              <ListItemText primary="ホーム" />
            </ListItem>
            <ListItem button component="a" href="/search">
              <ListItemIcon><SearchIcon /></ListItemIcon>
              <ListItemText primary="年表を探す" />
            </ListItem>
            <ListItem button component="a" href="/create">
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="年表を作る" />
            </ListItem>
            <Divider className={classes.divider} />
            {(() => {
              if (user) {
                return(
                  <>
                    <ListItem button component="a" href="/mypage">
                      <ListItemIcon><AccountCircle /></ListItemIcon>
                      <ListItemText primary="マイページ" />
                    </ListItem>
                    <ListItem button component="a" onClick={ logout } >
                      <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                      <ListItemText primary="ログアウト" />
                    </ListItem>
                  </>
                );
              } else {
                return(
                  <ListItem button component="a" href="/login">
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="ログイン" />
                  </ListItem>
                );
              }
            })()}
          </List>
        </div>
      </Drawer>
    </div>
  );
};
