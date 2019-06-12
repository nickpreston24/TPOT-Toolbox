import app from 'firebase/app';
import { firebaseConfig } from '../keys'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.auth();
    }

    // *** Authentication API ***

    createUser = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    signIn = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    signOut = () => this.auth.signOut();

    resetPassword = email => this.auth.sendPasswordResetEmail(email);

    updatePassword = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;