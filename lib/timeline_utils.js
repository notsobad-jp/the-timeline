import csv from 'csvtojson'
import request from 'request'

export async function getTimelineData(url) {
  let groupNames = [];
  let timelineStart, timelineEnd;
  return csv()
    .fromStream(request.get(url))
    .subscribe((json)=>{
      json.content = json["Title"];
      if(json["Year"]){
        json.start = parseDate(json["Year"], json["Month"], json["Day"], json["Time"]);
        if(!timelineStart || Date.parse(json.start) < Date.parse(timelineStart)) { timelineStart = json.start };
      }
      if(json["End Year"]){
        const d = new Date();
        json.end = (json["End Year"]=='now') ? d.toString() : parseDate(json["End Year"], json["End Month"], json["End Day"], json["End Time"]);
        let compareEnd = json.end || json.start;  // endがなければ代わりにstartを代入
        if(!timelineEnd || Date.parse(compareEnd) > Date.parse(timelineEnd)) { timelineEnd = compareEnd };
      }
      json.group = json["Group"];
      if(groupNames.indexOf(json['Group']) < 0) {
        groupNames.push(json['Group']);
      }
      json.title = json["Title"]
    })
    .then((json) => {
      const colors = ['red', 'blue', 'green', 'orange', 'yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
      const groups = [];
      groupNames.forEach((groupName, index) => {
        groups.push({id: groupName, content: "", order: index, className: `${colors[index % colors.length]} ${groupName}`});
      });

      //全グループに透明のitemを追加
      // 全体の開始/終了を取得
      let items = json.filter(j => j.start);
      groupNames.forEach((groupName, index) => {
        items.push({
          start: timelineStart,
          end: timelineEnd,
          className: "transparent",
          group: groupName,
          content: groupName
        });
      });

      return({
        items: items,
        groups: groups
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
