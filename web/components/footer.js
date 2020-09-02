import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '../src/Link';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';


const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#000',
    color: '#ccc',
  },
  footerLinks: {
    '& a': {
      color: '#ccc',
      textDecoration: 'none',
      '&:hover': {
        color: '#fff',
        textDecoration: 'underline',
      },
    },
  },
  menu: {
    '& a': {
      marginRight: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    '& a:not(:last-child)': {
      borderRight: '1px solid #555',
    },
  },
  logoIcon: {
    marginRight: theme.spacing(1),
    verticalAlign: 'text-bottom',
  },
  twitterButton: {
    backgroundColor: 'rgb(90, 164, 235) !important',
    marginRight: theme.spacing(1),
  },
  facebookButton: {
    backgroundColor: 'rgb(59, 89, 152) !important',
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
        <Box mt={4}>
          <Button href="https://twitter.com/intent/tweet?hashtags=the_timeline&text=%E5%B9%B4%E8%A1%A8%E4%BD%9C%E6%88%90%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%80%8CTHE%20TIMELINE%EF%BC%88%E3%82%B6%E3%83%BB%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%A9%E3%82%A4%E3%83%B3%EF%BC%89%E3%80%8D&url=https%3A%2F%2Fthe-timeline.jp" component="a" target="_blank" variant="contained" color="primary" className={classes.twitterButton} size="small" startIcon={<TwitterIcon />}>ツイートする</Button>
          <Button href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fthe-timeline.jp" component="a" target="_blank" variant="contained" color="primary" className={classes.facebookButton} size="small" startIcon={<FacebookIcon />}>シェアする</Button>
        </Box>
        <Box className={[classes.footerLinks, classes.menu]} mt={4}>
          <a href="https://app.the-tournament.jp/pages/terms.html" target="_blank" rel="noopener" color="inherit">利用規約</a>
          <a href="https://app.the-tournament.jp/pages/privacy.html" target="_blank" rel="noopener" color="inherit">プライバシーポリシー</a>
          <a href="https://notsobad.jp" target="_blank" rel="noopener" color="inherit">運営会社</a>
        </Box>
        <Box className={classes.footerLinks} mt={2}>
          Copyright © THE TIMELINE 2016-{new Date().getFullYear()} All Rights Reserved.
        </Box>
        <Box className={classes.footerLinks}>
          <a href="https://visjs.github.io/vis-timeline/" target="_blank" rel="noopener">"vis.js and vis-timeline"</a>
          &nbsp;
          by
          &nbsp;
          <a href="https://visjs.org/" target="_blank" rel="noopener">vis.js community</a>
          &nbsp;
          is licensed under
          &nbsp;
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>.
        </Box>
      </Box>
    </AppBar>
  );
};
