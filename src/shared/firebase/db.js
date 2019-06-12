// import { db } from './firebase';
import Firebase from './firebase';
const db = Firebase.db;

// Create Profile
export const createProfile = (firstName, lastName, userCredential) => {
    return new Promise((resolve, reject) => {
        const email = userCredential.user.email
        const userID = userCredential.user.uid
        // const { email, uid: userID } = userCredential.user;
        const { creationTime, lastSignInTime } = userCredential.user.metadata
        db.collection('users').doc(`${userID}`).set({
            firstName,
            lastName,
            email,
            userID,
            creationTime,
            lastSignInTime
        })
            .then(docRef => resolve(docRef))
            .catch(error => reject(error))
    })
}

export const getUser = (id) => {
    db.collection('users').doc(id).get()
        .then((documentSnapshot) => {
            console.log(documentSnapshot.data())
        })
}

// Wordpress User API
export const wordpressCredentials = new Promise((resolve, reject) => {
    db.collection('public').doc('wp-credentials').get()
        .then((documentSnapshot) => {
            if (!!documentSnapshot) {
                resolve(documentSnapshot.data())
            } else {
                resolve(null)
            }
        })
        .catch(err => {
            reject(err)
        })
})

export default db;

// Other Entity APIs ...