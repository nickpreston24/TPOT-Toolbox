import { firebaseConfig } from '../keys'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase Project
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig.default);
}

// Fix for Firebase 5.0.4 Timestamp Deprecation
firebase.firestore().settings({ timestampsInSnapshots: true })

const app = firebase
const db = firebase.firestore();
const auth = firebase.auth();

export {
    app,
    auth,
    db,
};