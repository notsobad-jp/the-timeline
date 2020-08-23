import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import Link from '../src/Link';


const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#000',
    color: '#ccc',
  },
  footerLinks: {
    '& a': {
      color: '#ccc',
      textDecoration: 'none',
      marginRight: theme.spacing(1),
      paddingRight: theme.spacing(1),
      '&:hover': {
        color: '#fff',
        textDecoration: 'underline',
      },
    },
    '& a:not(:last-child)': {
      borderRight: '1px solid #555',
    },
  },
  logoIcon: {
    marginRight: theme.spacing(1),
    verticalAlign: 'text-bottom',
  },
}));

export default function Header(){
  const classes = useStyles();

  return (
    <AppBar className={classes.footer} position="static">
      <Box my={6} align="center">
        <Typography variant="h6" component="h1" className={classes.title}>
          <Link href="/" style={{color: '#fff'}}>
            <FormatAlignLeftIcon color="primary" className={classes.logoIcon} />
            THE TIMELINE
          </Link>
        </Typography>
        <Box className={classes.footerLinks} mt={2}>
          <a href="/" target="_blank" color="inherit">利用規約</a>
          <a href="/" target="_blank" color="inherit">プライバシーポリシー</a>
          <a href="/" target="_blank" color="inherit">お問い合わせ</a>
          <a href="/" target="_blank" color="inherit">運営会社</a>
        </Box>
        <Box className={classes.footerLinks} mt={2}>
          Copyright © THE TIMELINE 2016-{new Date().getFullYear()} All Rights Reserved.
        </Box>
      </Box>
    </AppBar>
  );
};
