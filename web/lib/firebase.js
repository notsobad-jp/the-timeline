import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth";

try {
  const config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
  };
  firebase.initializeApp(config);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}
const firestore = firebase.firestore();
const auth = firebase.auth();
export { auth, firestore, firebase };


export const getTimelines = async ({limit = 30, startAfter = null, endBefore = null, userId = null} = {}) => {
  let docRef = firestore.collection('timelines');
  const order = endBefore ? 'asc' : 'desc';
  docRef = docRef.orderBy('createdAt', order);

  if(limit) { docRef = docRef.limit(Number(limit)); }
  if(startAfter) { docRef = docRef.startAfter(new Date(startAfter)); }
  if(endBefore) { docRef = docRef.startAfter(new Date(endBefore)); }
  if(userId) { docRef = docRef.where('userId', '==', userId); }

  const snapshot = await docRef.get();
  let items = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    data.id = doc.id;
    data.createdAt = data.createdAt.toDate().toISOString();
    items.push(data);
  });
  items.sort((a,b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return items;
}


export const updateTitle = async (id, title) => {
  await firestore.collection('timelines').doc(id).update({title: title});
}
