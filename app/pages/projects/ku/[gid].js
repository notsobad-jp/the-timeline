import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../../../components/header';
import Timeline from '../../../components/timeline';
import { sheetsToJson } from '../../../lib/utils';
import { useState, useEffect } from 'react';


export default function Index({title, data, sourceUrl, gid}) {
  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_ROOT}/${gid}`;
  const [filteredData, setFilteredData] = useState(Object.assign(data));

  const actorCategories = [
    "政府行政機関",
    "国際機関",
    "研究機関",
    "企業",
    "学会",
    "新聞雑誌メディア",
    "市民",
    "病院",
    "教育機関"
  ]

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

  const countries = [
    "アイルランド",
    "アフリカ",
    "アメリカ",
    "イギリス",
    "イスラエル",
    "イタリア",
    "インド",
    "インドネシア",
    "ウクライナ",
    "エジプト",
    "エストニア",
    "エチオピア",
    "オーストラリア",
    "オーストリア",
    "オランダ",
    "カザフスタン",
    "カナダ",
    "キプロス",
    "ギリシャ",
    "世界",
    "サウジアラビア",
    "シンガポール",
    "スイス",
    "スウェーデン",
    "スウェーデン",
    "スコットランド",
    "スペイン",
    "スロバキア",
    "セルビア",
    "タイ",
    "チェコ",
    "デンマーク",
    "ドイツ",
    "トルクメニスタン",
    "ニュージーランド",
    "ノルウェー",
    "パキスタン",
    "ハンガリー",
    "フィリピン",
    "フィンランド",
    "ブラジル",
    "ブラジル",
    "フランス",
    "ベトナム",
    "ベルギー",
    "ポーランド",
    "マルタ",
    "マレーシア",
    "メキシコ",
    "ヨーロッパ",
    "ラテンアメリカ",
    "ラトビア",
    "リトアニア",
    "ロシア",
    "欧州",
    "韓国",
    "香港",
    "日本",
    "国際機関",
    "南アフリカ共和国",
    "台湾",
    "中国",
    "南アフリカ",
    "ケニア",
    "リベリア",
    "ブータン",
    "アジア"
  ]

  const [selectedCategories, setSelectedCategories] = useState([...categories, ...actorCategories, '日本']);

  const handleCategoryChange = e => {
    if (e.target.checked) {
      const newData = new Set(selectedCategories)
      newData.add(e.target.value)
      setSelectedCategories([...newData])
    } else {
      setSelectedCategories(selectedCategories.filter(n => n != e.target.value))
    }
    const filteredItems = filteredData.items.filter((d, index) => index != filteredData.items.length - 1)
    setFilteredData({...filteredData, items: filteredItems})
    console.log('---')
    console.log(filteredData.items.length)
  }

  if (!filteredData) {
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

      <div className='bg-gray-200 px-4 pt-8 pb-32 fixed left-0 h-full overflow-y-scroll z-10' style={{ top: 41, width: 250 }}>
        <div className='mb-4'>
          <h5 className="font-bold mb-2">アクターカテゴリ</h5>
          <ul>
            { actorCategories.map((category, index) => (
              <li>
                <label className="flex items-center hover:bg-gray-400" style={{ padding: '0.125rem 0' }}>
                  <input id={`actor_category_${index}`} type="checkbox" name="categories[]" defaultValue={ category } checked={ selectedCategories.includes(category) } onChange={ handleCategoryChange } className="mr-1" />
                  <span className="text-xs">
                    { category }
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className='mb-4'>
          <h5 className="font-bold mb-2">カテゴリ</h5>
          <ul>
            { categories.map((category, index) => (
              <li>
                <label className="flex items-center hover:bg-gray-400" style={{ padding: '0.125rem 0' }}>
                  <input id={`category_${index}`} type="checkbox" name="categories[]" defaultValue={ category } checked={ selectedCategories.includes(category) } className="mr-1" />
                  <span className="text-xs">
                    { category }
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className='mb-4'>
          <h5 className="font-bold mb-2">国</h5>
          <ul>
            { countries.map((category, index) => (
              <li>
                <label className="flex items-center hover:bg-gray-400" style={{ padding: '0.125rem 0' }}>
                  <input id={`country_${index}`} type="checkbox" name="categories[]" defaultValue={ category } checked={ selectedCategories.includes(category) } className="mr-1" />
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
        <Timeline data={filteredData} />
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


export async function getServerSideProps({params}) {
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
  }
}