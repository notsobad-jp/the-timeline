import csv from 'csvtojson'
import request from 'request'

const colors = ['red', 'blue', 'green', 'orange', 'yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

export async function sheetsToJson(urls) {
  let result = { items: [], groups: [] };

  const results = await Promise.all(urls.map((url) => sheetToJson(url)));
  results.forEach((res) => {
    result.items = result.items.concat(res.items);
    result.groups = result.groups.concat(res.groups);
  });
  return result;
}


async function sheetToJson(url) {
  let groupNames = [];

  return csv()
    .fromStream(request.get(url))
    .preFileLine((fileLine,lineNumber)=>{
      // 見出し行を小文字化
      return (lineNumber==0) ? fileLine.toLowerCase().replace(" ", "_") : fileLine;
    })
    .subscribe((json)=>{
      json.content = json["title"];
      if(json["year"]){
        json.start = parseDate(json["year"], json["month"], json["day"], json["time"]);
      }
      if(json["end_year"]){
        json.end = (json["end_year"]=='now') ? new Date().toString() : parseDate(json["end_year"], json["end_month"], json["end_day"], json["end_time"]);
      }
      // ユニークなGroup一覧を作成
      if(groupNames.indexOf(json.group) < 0) {
        groupNames.push(json.group);
      }
      json.group = `sub_${json.group}`; // 実際にはsub_groupに所属させる
    })
    .then((json) => {
      const groups = [];
      let items = json.filter(j => j.start);

      groupNames.forEach((groupName, index) => {
        const color = colors[index % colors.length];
        groups.push({id: groupName, content: groupName, nestedGroups: [`sub_${groupName}`], className: `nesting ${color} ${groupName}`});
        groups.push({id: `sub_${groupName}`, content: "", className: `nested ${color}`});
      });

      return({
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
      yyyy = ("-000000" + Math.abs(year)).slice(7);
    }
    const mm = (month) ? month - 1 : 0;
    const dd = (date) ? date : 1;

    let [hh, ii] = [0, 0];
    if(time) {
      const timeMatch = time.match(/(\d{2}):(\d{2})/);
      hh = timeMatch[1];
      ii = timeMatch[2];
    }
    const d = new Date(yyyy, mm, dd, hh, ii)
    if(isNaN(d.getDate())){ throw new Error("invalid date"); }
    return d.toString();
  } catch {
    return null;
  }
}
