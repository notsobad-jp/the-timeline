import { auth, firestore, firebase } from '../../lib/firebase.js'

export default async (req, res) => {
  const result = await new Promise((resolve, reject) => {
    let docRef = firestore.collection('timelines');
    docRef = docRef.where('version', '==', 'v2');
    const order = req.query.endBefore ? 'asc' : 'desc';
    docRef = docRef.orderBy('createdAt', order);

    if(req.query.limit) { docRef = docRef.limit(Number(req.query.limit)); }
    if(req.query.startAfter) { docRef = docRef.startAfter(new Date(req.query.startAfter)); }
    if(req.query.endBefore) { docRef = docRef.startAfter(new Date(req.query.endBefore)); }

    docRef.get()
      .then(snapshot => {
        let data = {items: []};

        snapshot.forEach(doc => {
          const docData = doc.data();
          docData.createdAt = docData.createdAt.toDate().toISOString();
          data.items.push(docData);
        });
        data.items.sort((a,b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
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
