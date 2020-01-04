import { firebaseConfig } from '../keys'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initFirestorter } from 'firestorter';

// Initialize The firebase App
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig.default);
}

initFirestorter({ firebase: firebase });

// Fix for Firebase 5.0.4 Timestamp Deprecation
// firebase.firestore().settings({ timestampsInSnapshots: true })

const app = firebase
const firestore = firebase.firestore();
const auth = firebase.auth();

export {
    app,
    auth,
    firestore,
};