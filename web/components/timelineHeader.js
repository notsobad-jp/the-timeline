import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { auth, firestore, firebase } from '../lib/firebase.js'
import Link from '../src/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import GridOnIcon from '@material-ui/icons/GridOn';
import ShareIcon from '@material-ui/icons/Share';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  snsButton: {
    color: "#fff",
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    "&:hover": {
      opacity: 0.9,
    },
    "&:first-child": {
      marginRight: theme.spacing(2),
    },
    "& svg": {
      marginRight: theme.spacing(1),
    },
  },
  twitter: {
    backgroundColor: "#2196f3 !important",
  },
  facebook: {
    backgroundColor: "#3B5998 !important",
  },
}));

export default function TimelineHeader({title, sourceUrl}){
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [dialogOpened, setDialogOpened] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton href="/" edge="start" className={classes.logoIcon} color="inherit">
            <FormatAlignLeftIcon />
          </IconButton>
          <Typography variant="h6" component="h1" className={classes.title}>
            { title }
          </Typography>

          <Tooltip title="Source" aria-label="Source">
            <IconButton href={sourceUrl} target="_blank" edge="start" color="inherit">
              <GridOnIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share" aria-label="Share">
            <IconButton onClick={()=>{ setDialogOpened(true); }} edge="start" color="inherit">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Dialog
        fullScreen={fullScreen}
        open={dialogOpened}
        onClose={()=>{ setDialogOpened(false); }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Share</DialogTitle>
        <DialogContent>
          <Button className={[classes.twitter, classes.snsButton]}>
            <TwitterIcon />
            Twitter
          </Button>
          <Button className={[classes.facebook, classes.snsButton]}>
            <FacebookIcon />
            Facebook
          </Button>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{ setDialogOpened(false); }} color="primary">
            Disagree
          </Button>
          <Button onClick={()=>{ setDialogOpened(false); }} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
