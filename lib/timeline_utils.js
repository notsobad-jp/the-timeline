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
      return (lineNumber==0) ? fileLine.toLowerCase().replace(/ /g, "_") : fileLine;
    })
    .subscribe((json)=>{
      json.display_date = displayDate(json);
      json.content = `${json["title"]}&nbsp;<small>(${json.display_date})</small>`;
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
      json['tippy-content'] = tippyContent(json);
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
