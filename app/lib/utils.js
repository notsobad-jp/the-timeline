import fs from 'fs'
import csv from 'csvtojson'

const colors = ['red', 'blue', 'green', 'orange', 'yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

export async function sheetsToJson(urls) {
  let result = { titles: [], items: [], groups: [] };

  const results = await Promise.all(urls.map((url) => sheetToJson(url)));
  results.forEach((res) => {
    result.titles = result.titles.concat(res.title);
    result.items = result.items.concat(res.items);
    result.groups = result.groups.concat(res.groups);
  });
  return result;
}

async function sheetToJson(url) {
  let groupNames = [];
  let csvString = '';
  let title = '';

  if(url.includes("http")) {
    const res = await fetch(url);
    csvString = await res.text();

    // headerからtitle取得
    const contentDisposition = res.headers.get('content-disposition');
    if(contentDisposition) {
      const titleMatch = decodeURIComponent(contentDisposition).match(/filename\*=UTF-8''(.*)\s-\s.*\.csv/)
      title = titleMatch ? decodeURI(titleMatch[1]) : '';
    }
  } else {
    // v1はローカルのcsvファイルから読み込む (titleはjsonから読むのでここでは空文字で返す)
    csvString = fs.readFileSync(url, 'utf8');
  }


  let itemIndex = 0;
  return csv()
    .fromString(csvString)
    .preFileLine((fileLine,lineNumber)=>{
      // 見出し行を小文字化
      return (lineNumber==0) ? fileLine.toLowerCase().replace(/ /g, "_") : fileLine;
    })
    .subscribe((json)=>{
      json.index = itemIndex;
      itemIndex += 1;
      json.display_date = displayDate(json);
      json.content = `${json["title"]}&nbsp;<small>(${json.display_date})</small>`;
      if(json["year"]){
        json.start = parseDate(json["year"], json["month"], json["day"], json["time"]);
      }
      if(json["end_year"]){
        json.end = (json["end_year"]=='now') ? new Date().toString() : parseDate(json["end_year"], json["end_month"], json["end_day"], json["end_time"]);
      }
      // ユニークなGroup一覧を作成
      if(!json.group) { json.group = '　　　'; } // 折りたたみできなくなるので、groupなしの場合は空白文字列に置き換え
      if(groupNames.indexOf(json.group) < 0 && json.year) {
        groupNames.push(json.group);
      }
      // endがないときのデフォルトを box -> point に変更 （endがあるときはデフォルトrangeなのでそのまま）
      if(!json.type && !json.end) { json.type = 'point'; }
      // colorが指定されてればclassNameに設定
      if(json.color) { json.className = json.color; }
      json.group = `sub_${json.group}`; // 実際にはsub_groupに所属させる
      json['tippy-content'] = tippyContent(json);
    })
    .then((json) => {
      const groups = [];
      let items = json.filter(j => j.start); // startがないデータは無視

      groupNames.forEach((groupName, index) => {
        const color = colors[index % colors.length];
        groups.push({id: groupName, content: groupName, nestedGroups: [`sub_${groupName}`], className: `nesting ${color} ${groupName}`});
        groups.push({id: `sub_${groupName}`, content: "", className: `nested ${color}`});
      });

      return({
        title: title,
        items: items,
        groups: groups,
      })
    })
}


function parseDate(year, month, date, time) {
  try {
    let yyyy;
    if(year >= 0) {
      // 年は最低４桁。入力が５桁以上ならそっちに合わせる
      yyyy = year.length > 4 ? year : ("0000" + year).slice(-4);
    }else {
      // 紀元前はマイナス+6桁表示
      yyyy = "-" + ("000000" + Math.abs(year)).slice(-6);
    }
    const mm = (month) ? ("00" + month).slice(-2) : "01";
    const dd = (date) ? ("00" + date).slice(-2) : "01";

    let [hh, ii] = ["00", "00"];
    if(time) {
      const timeMatch = time.match(/(\d{2}):(\d{2})/);
      hh = timeMatch[1];
      ii = timeMatch[2];
    }
    const dateString = `${yyyy}-${mm}-${dd}T${hh}:${ii}`;
    if(isNaN(new Date(dateString).getDate())){ throw new Error("invalid date"); }
    return dateString;
  } catch(e) {
    console.log(e);
    return null;
  }
}

function displayDate(element) {
  if(element.display_date) { return element.display_date; }

  let output = '';
  output += element['year'] + '年';
  if(element['month']) { output += element['month'] + '月'; }
  if(element['day']) { output += element['day'] + '日'; }

  if(element['end_year']){
    output += "～";
    if(element['end_year']!='now') {
      output += element['end_year'] + '年';
      if(element['end_month']) { output += element['end_month'] + '月'; }
      if(element['end_day']) { output += element['end_day'] + '日'; }
    }
  }
  return output;
}

function tippyContent(element) {
  let output = '';
  output += `<div>${element.title}</div>`;
  output += `<div><small>${element.display_date}</small></div>`;
  if(element.image_url) { output += `<div><img src="${element.image_url}" alt="${element.title}" /></div>`; }
  if(element.detail) { output += `<hr><div>${element.detail}</div>`; }
  if(element.url) { output += `<hr><div><a href="${element.url}" target="_blank">${element.url}</a></div>` }

  return output;
}
