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
import MoodIcon from '@material-ui/icons/Mood';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StorageIcon from '@material-ui/icons/Storage';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ForumIcon from '@material-ui/icons/Forum';
import MailOutlineIcon from '@material-ui/icons/MailOutline';


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
  subHeader: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing(6),
    '& svg': {
      verticalAlign: 'text-bottom',
      marginRight: theme.spacing(1),
    },
    '& span': {
      verticalAlign: 'text-top',
    },
    '&::before, &::after': {
      content: '""',
      borderTop: '1px solid #ddd',
      flexGrow: 1,
    },
    '&::before': {
      marginRight: theme.spacing(2),
    },
    '&::after': {
      marginLeft: theme.spacing(2),
    },
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


export default function Index({examples}) {
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

      <Box mb={16} mt={8}>
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

      <Box my={16}>
        <Typography className={classes.subHeader} variant="h6" component="h3" gutterBottom>
          <ExploreIcon />
          <span>サンプル</span>
        </Typography>

        <Grid container spacing={4}>
          {examples.map(example => (
            <Grid item xs={12} md={4} key={example.title}>
              <Card className={classes.card}>
                <CardMedia className={classes.media} image={`/images/top/examples/${example.image}`} title={example.title} href={example.url} target="_blank" component="a" />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h6" component="h4">
                    <a className={classes.titleLink} href={example.url} target="_blank" color="inherit">
                      {example.title}
                    </a>
                  </Typography>
                  <Box mb={1}>
                    {example.tags.map(tag => (
                      <Chip size="small" label={tag} key={tag} style={{marginRight: theme.spacing(1)}} />
                    ))}
                  </Box>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {example.description}
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
          ))}
        </Grid>

        <Box my={6} align="center">
          <Button className={classes.createButton} href="/create" variant="contained" size="large" fullWidth={ isMobile } endIcon={<ChevronRightIcon />}>
            他の年表も見てみる
          </Button>
        </Box>
      </Box>

      <Box my={16}>
        <Typography className={classes.subHeader} variant="h6" component="h3" gutterBottom>
          <FavoriteIcon />
          <span>ここがすごい</span>
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4} align="center">
            <MoodIcon style={{fontSize: 50}} color="secondary" />
            <Typography variant="h6" component="h4" gutterBottom>めっちゃ簡単</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Googleスプレッドシートにデータを入れるだけで、自動で年表化してくれます。むずかしい操作はまったくありません。
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} align="center">
            <AttachMoneyIcon style={{fontSize: 50}} color="secondary" />
            <Typography variant="h6" component="h4" gutterBottom>ずっと無料</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              基本機能はずっと無料。高度な機能のみ有料オプションとして提供予定です。
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} align="center">
            <StorageIcon style={{fontSize: 50}} color="secondary" />
            <Typography variant="h6" component="h4" gutterBottom>データなくならない</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              すべてのデータはGoogleスプレッドシートに保存。このサービスが終了してもデータはなくなりません！
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box my={16}>
        <Typography className={classes.subHeader} variant="h6" component="h3" gutterBottom>
          <ForumIcon />
          <span>よくある質問</span>
        </Typography>

        <ul>
          <Box component="li" mb={3}>
            <Typography className={classes.bold} gutterBottom>
              サービスの利用に料金は必要ですか？
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              いいえ、THE TIMELINEはすべての基本機能を無料で利用いただけます。今後有料プランの提供も検討していますが、基本機能はすべて無料でお使いいただけるようにする予定です。
            </Typography>
          </Box>
          <Box component="li" mb={3}>
            <Typography className={classes.bold} gutterBottom>
              一度作成した年表を更新するにはどうすればよいですか？
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Googleスプレッドシートで元データを編集すれば、THE TIMELINEの年表も自動で最新の内容に更新されます。
            </Typography>
          </Box>
          <Box component="li" mb={3}>
            <Typography className={classes.bold} gutterBottom>
              スプレッドシートを公開して、セキュリティ上の問題などないのでしょうか？
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              スプレッドシートを公開しても、誰でも閲覧が可能になるだけで、知らない人が勝手にファイルを編集できるようになるわけではありません（編集権限を一般公開することも可能ですが、おすすめしません）。 また公開したシート以外の情報が閲覧されることもありませんので、安心してご利用ください。
            </Typography>
          </Box>
          <Box component="li" mb={3}>
            <Typography className={classes.bold} gutterBottom>
              非公開の年表を作成したいのですが
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              非公開での年表作成オプションは、有料プランでの提供を検討しています。テスターとしてフィードバックにご協力いただける方には無料で先行提供することも可能ですので、ご興味あればお問い合わせください。
            </Typography>
          </Box>
          <Box component="li" mb={3}>
            <Typography className={classes.bold} gutterBottom>
              作成途中の年表を、公開せずに下書きで保存したいのですが
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Googleスプレッドシートを公開しなければ、年表が公開されることもありません。作成途中で年表を確認したい場合は、一時的にシートを公開し、年表をご確認ください。シートを非公開に戻せば年表も自動で非公開に戻ります。
            </Typography>
          </Box>
          <Box component="li" mb={3}>
            <Typography className={classes.bold} gutterBottom>
              作成した年表を削除したいのですが
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Googleスプレッドシートを削除もしくは非公開にすると、年表も自動で閲覧できなくなります。
            </Typography>
          </Box>
        </ul>
      </Box>

      <Box my={16}>
        <Typography className={classes.subHeader} variant="h6" component="h3" gutterBottom>
          <MailOutlineIcon />
          <span>お問い合わせ</span>
        </Typography>
        <Box align="center">
          ご意見・ご要望などあれば、info[at]notsobad.jp までお気軽にご連絡ください。
        </Box>
      </Box>
    </>
  );
}


export async function getStaticProps(context) {
  const examples = [
    {
      title: '村上春樹「1973年のピンボール」',
      image: 'pingball.jpg',
      url: 'https://the-timeline.jp/timelines/1Qv7_Up3aYyBalMcZQin242nCIRl4EKpzy7nyFXNf8Q0',
      tags: ['小説', '村上春樹'],
      description: '村上春樹の初期の名作「1973年のピンボール」。時系列がややこしいこの作品を、年表で整理してみました。「僕」と「鼠」の物語をわかりやすく色分けしています。',
    },
    {
      title: '週刊少年ジャンプで現在連載中のマンガ',
      image: 'jump.png',
      url: 'https://the-timeline.jp/timelines/1j4-SgB0Iw3RI-jR_4bQWpfMKzkdi9FbxALW8eqNwAI0',
      tags: ['マンガ', '少年ジャンプ'],
      description: '現在連載中の作品に加えて、少し前に連載終了した人気作品も合わせて年表化。こち亀のすごさも浮き彫りになります。',
    },
    {
      title: 'かっぴー「左ききのエレン」',
      image: 'ellen.jpg',
      url: 'https://the-timeline.jp/timelines/1PSEBmMVfu_y1fqZ8KcKrTZllBvFhDaOIZm35i7HNqas',
      tags: ['マンガ', '左ききのエレン'],
      description: 'かっぴーさん初の長編作品、Webで人気の「左ききのエレン」の出来事を年表で整理。天才になれなかったすべての人へーー。',
    },
    {
      title: '電気の歴史',
      image: 'electricity.jpg',
      url: 'https://app.the-timeline.jp/?key=1F8ypsB2FVq_uFeTe5OutFWHRe4Fsw8DtqwQ5Jq0aClg',
      tags: ['科学', '歴史'],
      description: '17世紀後半から、科学者たちが少しずつ電磁気の秘密を解き明かしていった歴史。 主にヨーロッパの出来事が中心ですが、日本の年号を並べて表示すると時代背景の比較ができておもしろいですね。',
    },
    {
      title: 'レイ・ブラッドベリ『火星年代記』',
      image: 'mars.png',
      url: 'https://app.the-timeline.jp/?key=1uZmRGsLz2A2N6OuTYi78woovscQXUcz7Gf4EyLAdXYY',
      tags: ['小説', '歴史'],
      description: 'レイ・ブラッドベリの名作SF「火星年代記」の出来事を年表で整理。実在の歴史だけでなく、小説や映画のストーリーを年表にして楽しむこともできます。',
    },
    {
      title: 'クエンティン・タランティーノ',
      image: 'tarantino.png',
      url: 'https://app.the-timeline.jp/?key=1hoMJYRvyXF8b3OyCiIsEDeGMk1DuAtuLbcY0oNAKWEc',
      tags: ['映画', '人物史'],
      description: '映画監督タランティーノの半生を、作品リスト・受賞歴とともに紹介。年表には画像を表示することもできます。自分史作成にも活用してください。',
    },
  ];


  return {
    props: {
      examples: examples,
    },
  }
}
