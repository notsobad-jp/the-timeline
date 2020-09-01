const admin = require('firebase-admin');
const fs = require('fs');
const stringify = require("csv-stringify/lib/sync");

if(true) {
  //staging
  const serviceAccount = require('./cert_stg.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://timeline-stg.firebaseio.com",
  });
} else {
  //production
  const serviceAccount = require('./cert.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://timeline-9747a.firebaseio.com",
  });
}

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true};
firestore.settings(settings);


// firebaseから全データ取得して、jsonとして保存
const importMetaToJson = () => {
  const resultJson = {};
  firestore.collection('timelines').limit(3).get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      if(data.version == 'v2') { return; }
      resultJson[doc.id] = {
        title: data.title,
        createdAt: data.createdAt.toDate().toISOString(),
        userId: data.userId,
        gid: doc.id,
      }
      console.log(doc.id);
    });
    fs.writeFileSync("./tasks/timelines_v1.json", JSON.stringify(resultJson));
  }).catch(error => {
    console.error(error);
  });
}
// importMetaToJson();


// jsonからSpreadsheetのデータを読み込んで、csvとして保存
const exportCsv = async (id) => {
  const Tabletop = require('tabletop');
  Tabletop.init({
    key: id,
    prettyColumnNames: false,
    simpleSheet: true,
    callback: (data, tabletop) => {
      const csvData = stringify(data, { header: true });
      fs.writeFileSync(`./tasks/csv/${id}.csv`, csvData);
    }
  });
}
const exportAllCsv = async () => {
  const jsonString = fs.readFileSync('./tasks/timelines_v1.json')
  const timelines = JSON.parse(jsonString);
  for(let id of Object.keys(timelines)) {
    console.log(timelines[id].title);
    await exportCsv(id);
  }
}
// exportAllCsv();
