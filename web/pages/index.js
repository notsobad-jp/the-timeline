import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from '../src/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Icon from '@material-ui/core/Icon';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GridOnIcon from '@material-ui/icons/GridOn';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';


const useStyles = makeStyles((theme) => ({
  fullWidth: {
    position: 'relative',
    width: '100vw',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  top: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  iframe: {
    width: 700,
    maxWidth: '100%',
    height: 500,
  },
  image: {
    maxWidth: '100%',
  },
  bold: {
    fontWeight: 'bold',
  },
  createButton: {
    minWidth: 300,
  },
  media: {
    height: 140,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActionButton: {
    flexGrow: 1,
  },
  titleLink: {
    textDecoration: 'none',
    color: '#000',
    '&:hover': { textDecoration: 'underline', },
  },
}));

export default function Index() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Alert className={classes.fullWidth} severity="warning">
        こちらは近日一般公開予定の新バージョンのベータ版です。
        ひととおりの機能は使えますが、安定した利用をご希望の場合は現行バージョンをお使いください。
        <a href="https://the-timeline.jp" target="_blank">https://the-timeline.jp</a>
      </Alert>

      <Box className={[classes.top, classes.fullWidth].join(" ")} py={8} px={2} align="center">
        <Typography variant="h3" component="h1" gutterBottom>
          年表でないと、伝えられないことがある。
        </Typography>
        <Typography gutterBottom>
          THE TIMELINE（ザ・タイムライン）は、
          簡単・便利な無料の年表作成サービスです。
        </Typography>
        <Box my={4}>
          <Button className={classes.createButton} href="/create" variant="contained" color="secondary" size="large" fullWidth={ isMobile } endIcon={<ChevronRightIcon />}>
            年表を作る
          </Button>
          <p><small>（ログインなしでも利用できます）</small></p>
        </Box>
        <Box my={4}>
          { false &&
            <iframe className={classes.iframe} seamless="" frameborder="0" src="https://app.the-timeline.jp/?key=1j4-SgB0Iw3RI-jR_4bQWpfMKzkdi9FbxALW8eqNwAI0&amp;start=19950226064037&amp;end=20200822005476"></iframe>
          }
        </Box>
      </Box>

      <Box my={8}>
        <Box align="center">
          <p>THE TIMELINEは、Googleスプレッドシートに入力したデータをもとに年表を作成するサービスです。</p>
          <p>テンプレートに沿ってデータを登録するだけで、THE TIMELINEが自動でデータを読み取り、きれいな年表を作成してくれます。</p>
        </Box>

        <Stepper alternativeLabel={!isMobile} orientation={isMobile ? 'vertical' : 'horizontal'}>
          <Step active={true}>
            <StepLabel>
              <Typography className={classes.bold}>スプレッドシートにデータを登録</Typography>
              { !isMobile &&
                <img src="/images/top/howto.png" alt="データ登録" className={classes.image} />
              }
            </StepLabel>
            { isMobile &&
              <StepContent>
                <img src="/images/top/howto.png" alt="データ登録" className={classes.image} />
              </StepContent>
            }
          </Step>
          <Step active={true}>
            <StepLabel>
              <Typography className={classes.bold}>データを読み取って年表表示</Typography>
              { !isMobile &&
                <img src="/images/top/sample.png" alt="年表表示" className={classes.image} />
              }
            </StepLabel>
            { isMobile &&
              <StepContent>
                <img src="/images/top/sample.png" alt="年表表示" className={classes.image} />
              </StepContent>
            }
          </Step>
        </Stepper>
      </Box>

      <Box my={8}>
        <Typography variant="h5" component="h3" gutterBottom>サンプル</Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image="/images/top/examples/pingball.jpg" title="1973年のピンボール" href="https://the-timeline.jp/timelines/1Qv7_Up3aYyBalMcZQin242nCIRl4EKpzy7nyFXNf8Q0" target="_blank" component="a" />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h4">
                  <a className={classes.titleLink} href="https://the-timeline.jp/timelines/1Qv7_Up3aYyBalMcZQin242nCIRl4EKpzy7nyFXNf8Q0" target="_blank" color="inherit">
                    村上春樹「1973年のピンボール」
                  </a>
                </Typography>
                <Box mb={1}>
                  <Chip size="small" label="村上春樹" />
                  <Chip size="small" label="小説" />
                </Box>
                <Typography variant="body2" color="textSecondary" component="p">
                  村上春樹の初期の名作「1973年のピンボール」。時系列がややこしいこの作品を、年表で整理してみました。「僕」と「鼠」の物語をわかりやすく色分けしています。
                </Typography>
              </CardContent>
              <CardActions>
                <Button className={classes.cardActionButton} size="small" color="primary" startIcon={<FormatAlignLeftIcon />}>
                  年表を見る
                </Button>
                <Button className={classes.cardActionButton} size="small" color="primary" startIcon={<GridOnIcon />}>
                  元データ
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image="/images/top/examples/jump.png" title="週刊少年ジャンプ" href="https://the-timeline.jp/timelines/1j4-SgB0Iw3RI-jR_4bQWpfMKzkdi9FbxALW8eqNwAI0" target="_blank" component="a" />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h4">
                  <a className={classes.titleLink} href="https://the-timeline.jp/timelines/1j4-SgB0Iw3RI-jR_4bQWpfMKzkdi9FbxALW8eqNwAI0" target="_blank" color="inherit">
                    週刊少年ジャンプで現在連載中のマンガ
                  </a>
                </Typography>
                <Box mb={1}>
                  <Chip size="small" label="マンガ" />
                  <Chip size="small" label="少年ジャンプ" />
                </Box>
                <Typography variant="body2" color="textSecondary" component="p">
                  現在連載中の作品に加えて、少し前に連載終了した人気作品も合わせて年表化。こち亀のすごさも浮き彫りになります。
                </Typography>
              </CardContent>
              <CardActions>
                <Button className={classes.cardActionButton} size="small" color="primary" startIcon={<FormatAlignLeftIcon />}>
                  年表を見る
                </Button>
                <Button className={classes.cardActionButton} size="small" color="primary" startIcon={<GridOnIcon />}>
                  元データ
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image="/images/top/examples/ellen.jpg" title="左ききのエレン" href="https://the-timeline.jp/timelines/1PSEBmMVfu_y1fqZ8KcKrTZllBvFhDaOIZm35i7HNqas" target="_blank" component="a" />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h4">
                  <a className={classes.titleLink} href="https://the-timeline.jp/timelines/1PSEBmMVfu_y1fqZ8KcKrTZllBvFhDaOIZm35i7HNqas" target="_blank" color="inherit">
                    かっぴー「左ききのエレン」
                  </a>
                </Typography>
                <Box mb={1}>
                  <Chip size="small" label="マンガ" />
                  <Chip size="small" label="左ききのエレン" />
                </Box>
                <Typography variant="body2" color="textSecondary" component="p">
                  かっぴーさん初の長編作品、Webで人気の「左ききのエレン」の出来事を年表で整理。天才になれなかったすべての人へーー。
                </Typography>
              </CardContent>
              <CardActions>
                <Button className={classes.cardActionButton} size="small" color="primary" startIcon={<FormatAlignLeftIcon />}>
                  年表を見る
                </Button>
                <Button className={classes.cardActionButton} size="small" color="primary" startIcon={<GridOnIcon />}>
                  元データ
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
