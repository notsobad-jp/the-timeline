const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fs = require('fs');
const xss = require('xss');
const RSS = require('rss');

const BASE_URL = 'https://the-timeline.jp/'

admin.initializeApp();



/* Trigger: /timelines/xxxx  */
/* 詳細ページへの直接アクセスは、metaタグを埋め込んでからindex.htmlを返す */
exports.returnWithOGP = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=86400, s-maxage=2592000');

  const id = req.path.match(/\/timelines\/([^\/\?]*)/)[1]
  const url = 'https://the-timeline.jp' + req.url;
  const encodedUrl = encodeURIComponent(url);
  const sourceUrl = 'https://docs.google.com/spreadsheets/d/' + id + '/pubhtml';

  fs.readFile('./embed.html', 'utf8', function (err, templateHtml) {
    if(err) { res.status(500).send(err); }

    admin.firestore().collection('timelines').doc(id).get().then(doc => {
      const timeline = doc.data();
      const responseHtml = templateHtml
        .replace(/\{{title}}/g, xss(timeline.title))
        .replace(/\{{id}}/g, id)
        .replace(/\{{url}}/g, url)
        .replace(/\{{encodedUrl}}/g, encodedUrl)
        .replace(/\{{sourceUrl}}/g, sourceUrl);

      res.status(200).send(responseHtml);
    }).catch(error => {
      console.error(error);
      res.status(404).send(templateHtml);
    });
  })
});



/* Trigger: /feed  */
/* /feed にアクセスが来たら、動的にrssフィードを作って返す */
exports.returnRSS = functions.https.onRequest((req, res) => {
  res.set('Cache-Control', 'public, max-age=21600, s-maxage=43200');
  res.set('Content-Type', 'application/xml');
  const feedItemCount = 20;

  let feed = new RSS({
    title: 'THE TIMELINE',
    feed_url: BASE_URL + 'feed',
    site_url: BASE_URL,
    language: 'ja',
  })

  let docRef = admin.firestore().collection("timelines").orderBy('createdAt', 'desc').limit(feedItemCount);
  docRef.get().then(function(querySnapshot){
    const items = querySnapshot.docs;
    for(var i=0; i < items.length; i++ ) {
      let item = items[i].data();
      let url = BASE_URL + 'timelines/' + items[i].id;

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
