import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../../components/header';
import Timeline from '../../components/timeline';
import { sheetsToJson } from '../../lib/utils';
import { useState, useEffect } from 'react';
const fs = require("fs");
const sheetsJSON = require('../../src/json/ku.json');


export default function Index({title, data, sourceUrl, gid}) {
  const router = useRouter();
  const canonicalUrl = `${process.env.NEXT_PUBLIC_APP_ROOT}/${gid}`;

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

  const years = [
    "2019年以前",
    "2020年上半期",
    "2020年下半期",
    "2021年上半期",
    "2021年下半期",
    "2022年上半期",
    "2022年下半期",
    "2023年以降",
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

  const [selectedCategories, setSelectedCategories] = useState(['政策対応']);
  const [selectedActorCategories, setSelectedActorCategories] = useState(['政府行政機関']);
  const [selectedCountries, setSelectedCountries] = useState(['日本']);
  const [selectedYears, setSelectedYears] = useState(['2020年上半期','2020年下半期','2021年上半期','2021年下半期','2022年上半期','2022年下半期']);

  const [filteredData, setFilteredData] = useState(
                                            Object.assign({...data,
                                              groups: data.groups.filter(group =>
                                                selectedCategories.filter(x => group.id == x || group.id == `sub_${x}`).length > 0
                                              ),
                                              items: data.items.filter(item =>
                                                item.title != '' &&
                                                selectedCategories.filter(x => item.category.split(',').includes(x)).length > 0 &&
                                                selectedActorCategories.filter(x => item.category.split(',').includes(x)).length > 0 &&
                                                selectedYears.filter(x => item.category.split(',').includes(x)).length > 0 &&
                                                selectedCountries.filter(x => item.category.split(',').includes(x)).length > 0
                                              )
                                            })
                                          );

  const handleCategoryChange = (e, categoryType) => {
    let newCategories = selectedCategories
    let newActorCategories = selectedActorCategories
    let newCountries = selectedCountries
    let newYears = selectedYears

    if (categoryType == 'category') {
      if (e.target.checked) {
        setSelectedCategories([...selectedCategories, e.target.value])
        newCategories = [...selectedCategories, e.target.value]
      } else {
        setSelectedCategories(selectedCategories.filter(n => n != e.target.value))
        newCategories = selectedCategories.filter(n => n != e.target.value)
      }
    } else if (categoryType == 'actorCategory') {
      if (e.target.checked) {
        setSelectedActorCategories([...selectedActorCategories, e.target.value])
        newActorCategories = [...selectedActorCategories, e.target.value]
      } else {
        setSelectedActorCategories(selectedActorCategories.filter(n => n != e.target.value))
        newActorCategories = selectedActorCategories.filter(n => n != e.target.value)
      }
    } else if (categoryType == 'year') {
      if (e.target.checked) {
        setSelectedYears([...selectedYears, e.target.value])
        newYears = [...selectedYears, e.target.value]
      } else {
        setSelectedYears(selectedYears.filter(n => n != e.target.value))
        newYears = selectedYears.filter(n => n != e.target.value)
      }
    } else if (categoryType == 'country') {
      if (e.target.checked) {
        setSelectedCountries([...selectedCountries, e.target.value])
        newCountries = [...selectedCountries, e.target.value]
      } else {
        setSelectedCountries(selectedCountries.filter(n => n != e.target.value))
        newCountries = selectedCountries.filter(n => n != e.target.value)
      }
    }

    setFilteredData(Object.assign({
      ...filteredData,
      groups: data.groups.filter(group =>
        newCategories.filter(x => group.id == x || group.id == `sub_${x}`).length > 0
      ),
      items: data.items.filter(item =>
        item.title != '' &&
        newCategories.filter(x => item.category.split(',').includes(x)).length > 0 &&
        newActorCategories.filter(x => item.category.split(',').includes(x)).length > 0 &&
        newYears.filter(x => item.category.split(',').includes(x)).length > 0 &&
        newCountries.filter(x => item.category.split(',').includes(x)).length > 0
      )
    }))
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

      <div className='bg-gray-200 px-4 pb-32 fixed left-0 h-full overflow-y-scroll z-10' style={{ top: 41, width: 250 }}>
        <div className='bg-gray-200 fixed -mx-4 px-4 py-4 mb-4 border-b border-gray-500 z-30' style={{ width: 250 }}>
          <div>
            <span className='text-2xl'>{ filteredData.items.length }</span>
            件
            <span className='ml-1'>選択中</span>
          </div>
          { filteredData.items.length > 300 &&
            <div className='text-xs text-red-700 mt-1'>
              ※選択件数が多いため最初の300件のみ表示されています。すべて表示したい場合は300件以下になるように検索条件を変更してください。
            </div>
          }
        </div>

        <div className={ filteredData.items.length > 300 ? 'pt-40' : 'pt-24'}>
          <div className='mb-4'>
            <h5 className="font-bold mb-2">アクターカテゴリ</h5>
            <ul>
              { actorCategories.map((category, index) => (
                <li key={index}>
                  <label className="flex items-center hover:bg-gray-400" style={{ padding: '0.125rem 0' }}>
                    <input id={`actor_category_${index}`} type="checkbox" name="categories[]" defaultValue={ category } checked={ selectedActorCategories.includes(category) } onChange={ (e) => handleCategoryChange(e, 'actorCategory') } className="mr-1" />
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
                <li key={index}>
                  <label className="flex items-center hover:bg-gray-400" style={{ padding: '0.125rem 0' }}>
                    <input id={`category_${index}`} type="checkbox" name="categories[]" defaultValue={ category } checked={ selectedCategories.includes(category) } onChange={ (e) => handleCategoryChange(e, 'category') } className="mr-1" />
                    <span className="text-xs">
                      { category }
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-4'>
            <h5 className="font-bold mb-2">年代</h5>
            <ul>
              { years.map((category, index) => (
                <li key={index}>
                  <label className="flex items-center hover:bg-gray-400" style={{ padding: '0.125rem 0' }}>
                    <input id={`year_${index}`} type="checkbox" name="categories[]" defaultValue={ category } checked={ selectedYears.includes(category) } onChange={ (e) => handleCategoryChange(e, 'year') } className="mr-1" />
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
                <li key={index}>
                  <label className="flex items-center hover:bg-gray-400" style={{ padding: '0.125rem 0' }}>
                    <input id={`country_${index}`} type="checkbox" name="categories[]" defaultValue={ category } checked={ selectedCountries.includes(category) } onChange={ (e) => handleCategoryChange(e, 'country') } className="mr-1" />
                    <span className="text-xs">
                      { category }
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Timeline data={filteredData} />

      { data.items.length == 0 &&
        <div className="absolute top-0 mt-12 w-full">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-2 z-50" role="alert">
            <span>データの読み取りに失敗しました。シートがWebに公開されていることをご確認ください。</span>
          </div>
        </div>
      }

      <style global jsx>{`
        .vis-labelset {
          left: 250px;
        }
      `}</style>

    </>
  );
}


export async function getStaticProps({params}) {
  const gid = '2PACX-1vRARwi177UycmBpwbR1TsKNHh9PSkgmI012uAg-NsV-QmcE5rUKXHQoR8HN1P8RoabgDZsGKeEHRpu0'
  const sourceUrl = `https://docs.google.com/spreadsheets/d/e/${gid}/pubhtml`;

  // シートから直接読み込み
  let data = await sheetsToJson([sourceUrl.replace(/pubhtml/, "pub?output=csv")]);
  const columns = ["group", "year", "month", "day", "time", "end_year", "end_month", "end_day", "end_time", "display_date", "url", "image_url", "image_credit", "type", "color", "category", "title", "index", "content", "start", "tippy-content"]
  data.items = data.items.map((item) => {
    let newItem = {}
    Object.keys(item).forEach((key) => {
      if(columns.includes(key)) {
        newItem[key] = item[key]
      }
    })
    return newItem
  })

  // jsonファイルに書き出し
  // fs.writeFileSync('src/json/ku.json', JSON.stringify(data))

  // 保存済みのjsonから読み込み
  // const data = sheetsJSON

  const title = data["titles"][0];

  return {
    props: {
      gid: gid,
      title: title,
      data: data,
      sourceUrl: sourceUrl,
      noAds: true,
    },
  }
}
