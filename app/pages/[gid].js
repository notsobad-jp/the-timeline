import { useRouter } from 'next/router'
import Head from 'next/head'
import Timeline from '../components/timeline';
import { sheetsToJson } from '../lib/utils';


export default function Index({title, data, sourceUrl, gid}) {
  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_ROOT}/${gid}`;

  if (router.isFallback) {
    return(
      <>
        <div className="bg-black px-4 py-3 text-white flex w-full z-50">
          <h1>
            <div className="inline-block w-4 h-4 text-teal-500 fill-current mr-3 align-middle">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></svg>
            </div>
            <span className="align-middle">　</span>
          </h1>
        </div>

        <div className="mt-16 text-center">
          <div>Loading...</div>
        </div>
      </>
    )
  }

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

      <div className="bg-black px-4 py-3 text-white flex fixed w-full z-50">
        <h1 className="flex-grow truncate">
          <a href={`${process.env.NEXT_PUBLIC_WEB_ROOT}`} target="_blank" rel="noopener">
            <div className="inline-block w-4 h-4 text-teal-500 fill-current mr-3 align-middle">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></svg>
            </div>
          </a>
          <span className="align-middle">{ title }</span>
        </h1>

        <div className="flex text-right">
          <a href={sourceUrl} target="_blank" rel="noopener">
            <div className="inline-block w-4 h-4 fill-current align-middle hover:opacity-75">
              <svg focusable="true" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"></path></svg>
            </div>
          </a>
          <a href={`https://twitter.com/share?url=${encodeURIComponent(canonicalUrl)}&hashtags=the_timeline&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener">
            <div className="inline-block w-4 h-4 fill-current ml-4 align-middle hover:opacity-75">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path></svg>
            </div>
          </a>
        </div>
      </div>

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
  const sourceUrl = `https://docs.google.com/spreadsheets/d/e/${params.gid}/pubhtml`;
  const data = await sheetsToJson([sourceUrl.replace(/pubhtml/, "pub?output=csv")]);
  const title = data["titles"][0];

  return {
    props: {
      gid: params.gid,
      title: title,
      data: data,
      sourceUrl: sourceUrl,
    },
    unstable_revalidate: 60,
  }
}

export async function getStaticPaths() {
  let paths = [];
  try {
    const url = `${process.env.NEXT_PUBLIC_WEB_ROOT}/api/timelines?limit=100`;
    const json = await fetch(url).then(res => res.json());
    paths = json.items.map(item => {
      return {
        params: {
          gid: item.gid,
        }
      }
    });
  } catch(e) {
    console.log(e);
  }

  return {
    paths: paths,
    fallback: true
  }
}
