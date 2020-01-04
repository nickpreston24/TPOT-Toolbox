import { firestore } from './firebase';

// Create Profile
export const createProfile = (firstName, lastName, userCredential) => {
    return new Promise((resolve, reject) => {
        const email = userCredential.user.email
        const userID = userCredential.user.uid
        const { creationTime, lastSignInTime } = userCredential.user.metadata
        firestore.collection('users').doc(`${userID}`).set({
            firstName,
            lastName,
            email,
            userID,
            creationTime,
            lastSignInTime
        }).then((docRef) => {
            resolve(docRef)
        }).catch((error) => {
            reject(error)
        })
    })
}

// Wordpress
export const getWordpressCredentials = new Promise((resolve, reject) => {
    firestore.collection('public').doc('wp-credentials').get()
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
// Other Entity APIs ...