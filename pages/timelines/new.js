import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../../src/Link';
import { auth, firestore, firebase } from '../../lib/firebase.js'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


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
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    const titleField = document.getElementById('titleField');
    const urlField = document.getElementById('urlField');

    // URLがスプレッドシートの形式になっていることを確認
    const url = urlField.value.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/e\/.+\/pubhtml/g);
    if(!url) {
      alert("[Error] URL形式が異なっています。スプレッドシートのウェブ公開URLが正しく入力されていることをご確認ください。");
      setOpen(false);
      return;
    }

    // スプレッドシートが公開されていることを確認
    fetch(url, { method: 'HEAD' }).then(res => {
      // 公開されていればFirestoreに保存
      firestore.collection("v2").add({
        title: titleField.value,
        sources: [url[0].replace('pubhtml', 'pub?output=csv')],
        createdAt: new Date(),
      })
      .then(function(docRef) {
        router.push(`/timelines/${docRef.id}`);
      })
      .catch(function(error) {
        alert("[Error] データの保存に失敗しました。しばらくしてから再度お試しください。");
      });
    }).catch(error => {
      alert("[Error] スプレッドシートの読み込みに失敗しました。シートがウェブに公開されていることをご確認ください。");
    }).finally(() => {
      setOpen(false);
    });
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        New Timeline
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField id="titleField" required label="タイトル" fullWidth variant="outlined" className={classes.input} />
        <TextField id="urlField" required type="url" label="スプレッドシートの公開URL" fullWidth variant="outlined" className={classes.input} />
        <Button type="submit" variant="contained" size="large" color="secondary">Create</Button>
      </form>

      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
