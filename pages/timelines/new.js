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

  const handleSubmit = (e) => {
    e.preventDefault();
    const titleField = document.getElementById('titleField');
    const urlField = document.getElementById('urlField');

    //TODO: URLが読み取れるかチェック

    firestore.collection("v2").add({
      title: titleField.value,
      sources: [urlField.value],
      createdAt: new Date(),
    })
    .then(function(docRef) {
      router.push(`/timelines/${docRef.id}`);
    })
    .catch(function(error) {
      console.log(error);
      alert("Error! Failed on saving data.")
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
    </Container>
  );
}
