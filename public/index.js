const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');
const xss = require('xss');
const RSS = require('rss');

const bucketName = 'app.the-timeline.jp'
const version = 'v1'
const storage_root = (process.env.GCLOUD_PROJECT=='timeline-9747a') ? 'embed' : 'embed_stg';


var serviceAccount = require("./cert_"+ process.env.GCLOUD_PROJECT +".json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://"+ process.env.GCLOUD_PROJECT +".firebaseio.com"
});


exports.createEmbedHTML = functions.firestore.document('timelines/{id}').onWrite(event => {
  if(!event.data.exists) { return false; }  //削除時など、データがないときは終了

  const timeline = event.data.data();
  const id = event.params.id;
  const url = 'https://' + bucketName + '/' + storage_root + '/' + version + '/' + id + '.html';
  const encodedUrl = encodeURIComponent(url);
  const sourceUrl = 'https://docs.google.com/spreadsheets/d/' + id + '/pubhtml';

  const templateHtml = fs.readFileSync('./embed.html', 'utf8');
  const responseHtml = templateHtml
    .replace(/\{{title}}/g, xss(timeline.title))
    .replace(/\{{id}}/g, id)
    .replace(/\{{url}}/g, url)
    .replace(/\{{encodedUrl}}/g, encodedUrl)
    .replace(/\{{sourceUrl}}/g, sourceUrl);

  var file = admin.storage().bucket(bucketName).file(storage_root +'/'+ version +'/' + id + '.html');
  return file.save(responseHtml, {
    metadata: { contentType: 'text/html' },
    gzip: true
  });

  process.on('unhandledRejection', console.dir);
});


/* Trigger: /feed  */
/* /feed にアクセスが来たら、動的にrssフィードを作って返す */
exports.returnRSS = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=21600, s-maxage=43200');
  res.set('Content-Type', 'application/xml');
  const feedItemCount = 20;

  let feed = new RSS({
    title: 'THE TIMELINE',
    feed_url: 'https://the-timeline.jp/feed',
    site_url: 'https://the-timeline.jp/',
    language: 'ja',
  })

  let docRef = admin.firestore().collection("timelines").orderBy('createdAt', 'desc').limit(feedItemCount);
  docRef.get().then(function(querySnapshot){
    const items = querySnapshot.docs;
    for(var i=0; i < items.length; i++ ) {
      let item = items[i].data();
      let url = 'https://' + bucketName + '/' + storage_root + '/' + version + '/' + items[i].id + '.html';

      feed.item({
        title: item.title,
        description: item.title,
        url: url,
        date: item.createdAt, // any format that js Date can parse.
      });
    }
    res.status(200).send(feed.xml());
  }).catch(error => {
    console.error(error);
    res.status(500).send(error);
  });
});
