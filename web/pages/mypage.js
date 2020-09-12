import React, { useState, useContext, useEffect } from 'react';
import { getTimelines } from '../lib/firebase.js'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { UserContext } from './_app';
import TimelineList from '../components/TimelineList';
import Head from 'next/head';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const limit = 10;

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontWeight: 'bold',
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  accountCircle: {
    marginRight: theme.spacing(1),
  },
}));

export default function Mypage() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [user, setUser] = useContext(UserContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let ignore = false;
    if(!user) { return; }
    const fetchData = async () => {
      const res = await getTimelines({version: 'v2', limit: limit, userId: user.uid});
      if(!ignore) { setItems(res); }
    }
    fetchData();
    return () => { ignore = true; }
  }, [user] )


  return (
    <>
      <Head>
        <title>Mypage - THE TIMELINE</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div>
        <Typography variant="h5" component="h1" gutterBottom className={classes.pageTitle}>
          マイページ
        </Typography>

        { user && items.length > 0 &&
          <>
            <Alert severity="info">
              旧バージョンで作成した年表は今後更新が反映されません。更新が必要な場合は、お手数ですがURLを登録し直してください。
            </Alert>
            <TimelineList result={items} limit={limit} userId={user.uid} />
          </>
        }
        { user && items.length == 0 &&
          <>
            <Box my={2}>※まだ作成済みの年表がありません。</Box>
            <Button component={Link} href="/create" variant="contained" color="secondary" fullWidth={ isMobile }>年表を作る</Button>
          </>
        }

        { !user && items &&
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        }
      </div>
    </>
  );
}
