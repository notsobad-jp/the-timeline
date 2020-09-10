import fs from 'fs'
import Head from 'next/head'
import Header from '../../components/header';
import Timeline from '../../components/timeline';
import { sheetsToJson } from '../../lib/utils';


export default function Index({title, data, sourceUrl, canonicalUrl}) {
  return (
    <>
      <Head>
        <title>{ title } - 年表作成サービス「THE TIMELINE」</title>
        <meta name="description" content={`${title} | 年表作成サービス「THE TIMELINE」`} />
        <meta name="keywords" content={`${title},年表,時系列,出来事,歴史,まとめ,THE TIMELINE`} />
        <meta property="og:title" content={`${title} | 年表作成サービス「THE TIMELINE」`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_WEB_ROOT}/images/top/sample.png`} />
        <meta property="og:site_name" content="THE TIMELINE(ザ・タイムライン)" />
        <meta property="og:description" content={`${title} | 年表作成サービス「THE TIMELINE」`} />
        <meta property="og:locale" content="ja_JP" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Header title={title} sourceUrl={sourceUrl} canonicalUrl={canonicalUrl} />

      <Timeline data={data} />

      { data.items.length == 0 &&
        <div className="absolute top-0 mt-12 w-full">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-2 z-50" role="alert">
            <span>データの読み取りに失敗しました。シートがWebに公開されていることをご確認ください。</span>
          </div>
        </div>
      }
    </>
  );
}


export async function getStaticProps({params}) {
  const jsonString = fs.readFileSync('src/v1.json')
  const json = JSON.parse(jsonString);
  const timeline = json[params.gid];

  const sourceUrl = `https://docs.google.com/spreadsheets/d/${params.gid}/edit?usp=sharing`;
  const data = await sheetsToJson([`src/csv/v1/${params.gid}.csv`]);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_ROOT}/v1/${params.gid}`;

  return {
    props: {
      title: timeline.title,
      data: data,
      sourceUrl: sourceUrl,
      canonicalUrl: canonicalUrl
    },
  }
}

export async function getStaticPaths() {
  const jsonString = fs.readFileSync('src/v1.json')
  const json = JSON.parse(jsonString);
  let paths = [];
  Object.keys(json).map(gid => {
    try {
      fs.statSync(`src/csv/v1/${gid}.csv`);
      paths.push({
        params: { gid: gid }
      });
    } catch(err) {
      console.log(`No file: ${gid}`);
    }
  });

  return {
    paths: paths,
    fallback: false,
  }
}
