import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
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
}));

export default function TimelineHeader({title, sourceUrl}){
  const classes = useStyles();
  const router = useRouter();

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
            <IconButton href="/" edge="start" color="inherit">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
};
