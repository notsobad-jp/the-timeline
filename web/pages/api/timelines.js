import { auth, firestore, firebase } from '../../lib/firebase.js'

export default async (req, res) => {
  const result = await new Promise((resolve, reject) => {
    const collection = (req.query.version == 'v1') ? 'timelines' : 'v2';
    let docRef = firestore.collection(collection).orderBy('createdAt', 'desc');
    if(req.query.startAt) { docRef = docRef.startAt(new Date(req.query.startAt)); }
    if(req.query.limit) { docRef = docRef.limit(Number(req.query.limit)); }

    docRef.get()
      .then(snapshot => {
        let data = {items: []};

        snapshot.forEach(doc => {
          data.items.push(Object.assign({
            id: doc.id
          }, {
            title: doc.data().title,
            createdAt: doc.data().createdAt.toDate().toISOString(),
          }))
        })
        res.statusCode = 200
        resolve(data);
      }).catch(error => {
        res.statusCode = 500
        resolve(error);
      })
  });
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(result));
}
