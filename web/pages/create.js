import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import { auth, firestore, firebase } from '../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
  }
}));

export default function NewTimeline() {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [user, setUser] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  firebase.auth().onAuthStateChanged((u) => {
    setUser(u);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    const urlField = document.getElementById('urlField');

    // URLがスプレッドシートの形式になっていることを確認
    const { 0: url, 1: gid } = urlField.value.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/e\/(.+)\/pubhtml/);
    if(!url || !gid) {
      alert("[Error] URL形式が異なっています。スプレッドシートのウェブ公開URLが正しく入力されていることをご確認ください。");
      setOpen(false);
      return;
    }

    // ログイン状態であることを確認
    if(!user) {
      alert("[Error] ログインしてください");
      setOpen(false);
      return;
    }

    // スプレッドシートが公開されていることを確認
    fetch(url).then(res => {
      return res.text();
    }).then(body => {
      const title = body.match(/<title>(.*)<\/title>/)[1].replace(/ - Google (ドライブ|Drive)/, "");
      // 公開されていればFirestoreに保存
      firestore.collection("v2").doc(gid).set({
        title: title,
        gid: gid,
        createdAt: new Date(),
        userId: user.uid,
      })
      .then(docRef => {
        router.push(`/app/v2/${gid}`);
      })
      .catch(error => {
        console.log(error);
        alert("[Error] データの保存に失敗しました。しばらくしてから再度お試しください。");
      });
    }).catch(error => {
      alert("[Error] スプレッドシートの読み込みに失敗しました。シートがウェブに公開されていることをご確認ください。");
    }).finally(() => {
      setOpen(false);
    });
  }

  return (
    <>
      <Head>
        <title>New Timeline - THE TIMELINE</title>
      </Head>

      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Timeline
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField id="urlField" required type="url" label="スプレッドシートの公開URL" fullWidth className={classes.input} />
          <Button type="submit" variant="contained" fullWidth={ isMobile } size="large" color="secondary">Create</Button>
        </form>

        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </>
  );
}
