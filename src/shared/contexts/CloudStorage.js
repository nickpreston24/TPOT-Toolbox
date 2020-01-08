/**
 * Firebase Storage Provider
 * Intent: Wrap any component with the ability to do CRUD
 * with Firebase Storage
 */

import React from 'react'
import firebase from 'firebase';
import { Paper } from '../../apps/Scribe/models/Paper'
let db = firebase.firestore()

export const CloudStorage = React.createContext()
const firebaseApiKey = process.env.REACT_APP_FIREBASE_STORAGE_API_KEY || null

if (!firebaseApiKey) {
    console.warn('Invalid api key, could not initialize this context!');
}

const storageRef = firebase.storage().ref();
const uploadsFolder = 'originals'
const htmlFolder = 'tmp'

/**
 * Cloud File Provider
 * Allows any subscribers to interact with Cloud Storage files
 */
const CloudStorageProvider = (props) => {

    const upload = (file) => {
        let fileRef = storageRef.child(`${uploadsFolder}/${file.name}`);
        fileRef.put(file)
            .then(snapshot => {

                // NOTE: This is the Representation of state for a new Uploaded paper.  CheckoutPage will scan for new .html file matching this one's name.
                // ALSO NOTE: I'm using a hack to get this to work by removing functions from Paper.  FB hates classes as classes and their functions :'{.
                var { humanize, toString, ...emptyPaper } = new Paper({
                    docx: `${file.name}`,
                    title: file.name,
                    status: "not-started",
                    date_modified: Date.now(),
                    date_uploaded: Date.now(),
                    author: null,
                    draft_state: {
                        original: null,
                        editor: null,
                        code: null,
                    },
                    excerpt: null
                })

                console.log(emptyPaper);

                db.collection('session')
                    .doc(emptyPaper.slug)
                    .set(emptyPaper)
                    .catch(console.error)

                alert(!!snapshot
                    ? `Yay! File ${file.name} uploaded successfully!`
                    : `Fail! ${file.name} could not be uploaded!`)
            })
            .catch((error) => {
                console.log(error.message);
                alert('There was a problem uploading this file.')
            })
    }

    /** Download a file locally */
    const download = (fileName) => {
        // console.log('fileRef', fileRef);
        // fileRef.child('').getDownloadURL()
    }

    /** Mark a file for checkout */
    const checkout = (fileName) => {
        console.log(`Checking out ${fileName}`);
    }

    return (
        <CloudStorage.Provider value={{ upload, download, checkout }}>
            {props.children}
        </CloudStorage.Provider>
    )
}

export default CloudStorageProvider
