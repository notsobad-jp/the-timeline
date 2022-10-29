import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../../../components/header';
import Timeline from '../../../components/timeline';
import { sheetsToJson } from '../../../lib/utils';


export default function Index({title, data, sourceUrl, gid}) {
  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_ROOT}/${gid}`;

  const categories = [
    "政策対応",
    "医療",
    "ワクチン",
    "情報発信",
    "情報技術",
    "パンデミック",
    "看取り",
    "支援",
    "介護",
    "教育",
    "メンタルヘルス",
    "倫理",
    "国際関係",
    "アフターコロナ",
    "差別",
    "文化",
    "政策対応(オピニオン)",
    "医療(オピニオン)",
    "ワクチン(オピニオン)",
    "情報発信(オピニオン)",
    "情報技術(オピニオン)",
    "パンデミック(オピニオン)",
    "看取り(オピニオン)",
    "支援(オピニオン)",
    "介護(オピニオン)",
    "教育(オピニオン)",
    "メンタルヘルス(オピニオン)",
    "倫理(オピニオン)",
    "国際関係(オピニオン)",
    "アフターコロナ(オピニオン)",
    "差別(オピニオン)",
    "文化(オピニオン)"
  ]

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

  const scaasUrl = `https://scaas.vercel.app/api/?url=${process.env.NEXT_PUBLIC_WEB_ROOT}/${gid}?slowMo=500&maxAge=3600`;
  return (
    <>
      <Head>
        <title>{ title } - 年表作成サービス「THE TIMELINE」</title>
        <meta name="description" content={`${title} | 年表作成サービス「THE TIMELINE」`} />
        <meta name="keywords" content={`${title},年表,時系列,出来事,歴史,まとめ,THE TIMELINE`} />
        <meta property="og:title" content={`${title} | 年表作成サービス「THE TIMELINE」`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${scaasUrl}`} />
        <meta property="og:site_name" content="THE TIMELINE(ザ・タイムライン)" />
        <meta property="og:description" content={`${title} | 年表作成サービス「THE TIMELINE」`} />
        <meta property="og:locale" content="ja_JP" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={`${title} | 年表作成サービス「THE TIMELINE」`} />
        <meta name="twitter:image:src" content={`${scaasUrl}`} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Header title={title} sourceUrl={sourceUrl} canonicalUrl={canonicalUrl} />

      <div style={{ position: 'absolute', left: 0, top: 41, width: 250, height: 'max-content', minHeight: '100vh', padding: 20, zIndex: 1, backgroundColor: '#eee' }}>
        <div>
          <h5 className="font-bold mb-2">カテゴリ</h5>
          <ul className="space-y-1">
            { categories.map((category) => (
              <li>
                <label className="flex items-center">
                  <input type="checkbox" name="categories[]" value={ category } className="mr-1" />
                  <span className="text-xs">
                    { category }
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ position: 'relative', left: 250 }}>
        <Timeline data={data} />
      </div>

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
