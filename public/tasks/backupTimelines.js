const admin = require('firebase-admin');
const fs = require('fs');
const stringify = require("csv-stringify/lib/sync");

const serviceAccount = require('./cert.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://timeline-stg.firebaseio.com",
});


const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true};
firestore.settings(settings);



const Tabletop = require('tabletop');
const id = '1-6Wi-vO7zo5U37xomI2dc1PQc-NFRc_fJXkGjiH6T7c';
function init() {
  Tabletop.init({
    key: id,
    prettyColumnNames: false,
    simpleSheet: true,
    callback: showInfo
  });
}

function showInfo(data, tabletop) {
  // do something with the data
  // console.log("tabletop!!")
  // console.log(JSON.stringify(data));
  const csvData = stringify(data, { header: true });
  fs.writeFileSync("./tasks/sample.csv", csvData);
}

//initialise and kickstart the whole thing.
init()


// console.log("----")
// const id = '1-6Wi-vO7zo5U37xomI2dc1PQc-NFRc_fJXkGjiH6T7c';
// firestore.collection('timelines').doc(id).get().then(doc => {
//   const timeline = doc.data();
//   console.log(timeline);
// }).catch(error => {
//   console.error(error);
// });
