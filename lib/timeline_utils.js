import csv from 'csvtojson'
import request from 'request'

export async function getTimelineData(url) {
  let groupNames = [];
  return csv()
    .fromStream(request.get(url))
    .subscribe((json)=>{
      json.content = json["Title"];
      json.start = calcDateTime(json["Year"], json["Month"], json["Day"], json["Time"]);
      if(json["End Year"]){
        const d = new Date();
        const currentDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        json.end = (json["End Year"]=='now') ? currentDate : calcDateTime(json["End Year"], json["End Month"], json["End Day"], json["End Time"]);
      }
      json.group = json["Group"];
      if(groupNames.indexOf(json['Group']) < 0) {
        groupNames.push(json['Group']);
      }
    })
    .then((json) => {
      const colors = ['red', 'blue', 'green', 'orange', 'yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
      const groups = [];
      groupNames.forEach((groupName, index) => {
        groups.push({id: groupName, content: groupName, order: index, className: colors[index]});
      });

      return({
        items: json,
        groups: groups
      })
    })
}


function calcDateTime(year, month, date, time) {
  let yyyy;
  if(year >= 0) {
    // 年は最低４桁。入力が５桁以上ならそっちに合わせる
    yyyy = year.length > 4 ? year : ("0000" + year).slice(-4);
  }else {
    // 紀元前はマイナス+７桁表示（TODO: 入力が7桁以上のときどうする？？）
    yyyy = ("-0000000" + Math.abs(year)).slice(8);
  }
  const mm = month ? ("00" + month).slice(-2) : "01";
  const dd = date ? ("00" + date).slice(-2) : "01";

  return `${yyyy}-${mm}-${dd} ${time}`
}
