import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router'
import { UserContext } from './_app';
import { auth, firestore, firebase } from '../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  image: {
    maxWidth: '100%',
  }
}));

export default function NewTimeline() {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [user, setUser] = useContext(UserContext);

  const handleClose = () => {
    setOpen(false);
  };

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
      firestore.collection("timelines").doc(gid).set({
        title: title,
        gid: gid,
        createdAt: new Date(),
        userId: user.uid,
        version: 'v2',
      })
      .then(docRef => {
        router.push(`/app/${gid}`);
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
        <title>Create New Timeline - THE TIMELINE</title>
      </Head>

      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" component="h1" gutterBottom>Create</Typography>

        <Box mb={8}>
          <form onSubmit={handleSubmit}>
            <TextField id="urlField" required type="url" label="スプレッドシートの公開URL" fullWidth className={classes.input} />
            <Button type="submit" variant="contained" fullWidth={ isMobile } size="large" color="secondary">Create</Button>
          </form>
          <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>作成手順</Typography>

          <Box mb={4}>
            <Typography variant="h6" gutterBottom>① テンプレートからシートを新規作成</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <img src="/images/create/1.png" alt="テンプレートからシートを新規作成" className={classes.image} />
              </Grid>
              <Grid item xs={12} sm={6}>
                以下のテンプレートをコピーして、自分用のシートを作成します。
                下記のリンク先で、メニューの「ファイル」→「コピーを作成」を選択してください。
              </Grid>
            </Grid>
          </Box>

          <Box mb={4}>
            <Typography variant="h6" gutterBottom>② シートにデータを登録</Typography>
            <Box>
              作成したシートで、テンプレートの形式に沿ってデータを登録します。
              データ登録方法のオプションについては、サンプルの元データを参考にしてください。
            </Box>
          </Box>

          <Box mb={4}>
            <Typography variant="h6" gutterBottom>③ シートを公開する</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <img src="/images/create/3.png" alt="シートを公開する" className={classes.image} />
              </Grid>
              <Grid item xs={12} sm={6}>
                登録が完了したら、シートを公開します。 メニューの「ファイル」→「ウェブに公開」を選択してください。
                （Google公式ドキュメント）
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
