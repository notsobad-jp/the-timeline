import { auth, firestore, firebase } from '../../lib/firebase.js'

export default async (req, res) => {
  const result = await new Promise((resolve, reject) => {
    firestore.collection('v2').orderBy('createdAt', 'desc').limit(30).get()
      .then(snapshot => {
        let data = []
        snapshot.forEach(doc => {
          data.push(Object.assign({
            id: doc.id
          }, {
            title: doc.data().title,
            createdAt: doc.data().createdAt.toDate().toISOString().slice(0,10),
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
