import csv from 'csvtojson'
import request from 'request'

const colors = ['red', 'blue', 'green', 'orange', 'yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

export async function sheetsToJson(urls) {
  let groupNames = [];
  let timelineStart, timelineEnd;

  return await sheetToJson(urls[0]);
  // return csv()
  //   .fromStream(request.get(url))
  //   .preFileLine((fileLine,lineNumber)=>{
  //     // 見出し行を小文字化
  //     if(lineNumber==0) {
  //       fileLine = fileLine.toLowerCase().replace(" ", "_")
  //     }
  //     return fileLine
  //   })
  //   .subscribe((json)=>{
  //     json.content = json["title"];
  //     if(json["year"]){
  //       json.start = parseDate(json["year"], json["month"], json["day"], json["time"]);
  //       if(!timelineStart || Date.parse(json.start) < Date.parse(timelineStart)) { timelineStart = json.start };
  //     }
  //     if(json["end_year"]){
  //       const d = new Date();
  //       json.end = (json["end_year"]=='now') ? d.toString() : parseDate(json["end_year"], json["end_month"], json["end_day"], json["end_time"]);
  //       let compareEnd = json.end || json.start;  // endがなければ代わりにstartを代入
  //       if(!timelineEnd || Date.parse(compareEnd) > Date.parse(timelineEnd)) { timelineEnd = compareEnd };
  //     }
  //     if(groupNames.indexOf(json['group']) < 0) {
  //       groupNames.push(json['group']);
  //     }
  //   })
  //   .then((json) => {
  //     const colors = ['red', 'blue', 'green', 'orange', 'yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
  //     const groups = [];
  //     groupNames.forEach((groupName, index) => {
  //       groups.push({id: groupName, content: "", order: index, className: `${colors[index % colors.length]} ${groupName}`});
  //     });
  //
  //     // //全グループに透明のitemを追加
  //     // // 全体の開始/終了を取得
  //     // let items = json.filter(j => j.start);
  //     // groupNames.forEach((groupName, index) => {
  //     //   items.push({
  //     //     start: timelineStart,
  //     //     end: timelineEnd,
  //     //     className: "transparent",
  //     //     group: groupName,
  //     //     content: groupName
  //     //   });
  //     // });
  //
  //     return({
  //       items: items,
  //       groups: groups,
  //       window: {
  //         start: timelineStart,
  //         end: timelineEnd
  //       }
  //     })
  //   })
}


async function sheetToJson(url) {
  let groupNames = [];
  return csv()
    .fromStream(request.get(url))
    .preFileLine((fileLine,lineNumber)=>{
      // 見出し行を小文字化
      if(lineNumber==0) {
        fileLine = fileLine.toLowerCase().replace(" ", "_")
      }
      return fileLine
    })
    .subscribe((json)=>{
      json.content = json["title"];
      if(json["year"]){
        json.start = parseDate(json["year"], json["month"], json["day"], json["time"]);
      }
      if(json["end_year"]){
        json.end = (json["end_year"]=='now') ? new Date().toString() : parseDate(json["end_year"], json["end_month"], json["end_day"], json["end_time"]);
      }
      if(groupNames.indexOf(json['group']) < 0) {
        groupNames.push(json['group']);
      }
    })
    .then((json) => {
      const groups = [];
      groupNames.forEach((groupName, index) => {
        groups.push({id: groupName, content: "", order: index, className: `${colors[index % colors.length]} ${groupName}`});
      });

      let items = json.filter(j => j.start);
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
