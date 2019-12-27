/**
 * Firebase Storage Provider
 * Intent: Wrap any component with the ability to do CRUD
 * with Firebase Storage
 */

import React, { useState, useEffect } from 'react'
import { observable, action, computed } from 'mobx'
import firebase from 'firebase';

export const CloudFiles = React.createContext()
const firebaseApiKey = process.env.REACT_APP_FIREBASE_STORAGE_API_KEY || null

if (!firebaseApiKey) {
    console.warn('Invalid api key, could not initialize this context!');
}

/**
 * Cloud File Provider
 * Allows any subscribers to interact with Cloud Storage files
 */
const CloudFilesProvider = (props) => {
    let storageRef = firebase.storage().ref();
    let folderName = 'tmp'

    // const [document, setDocument] = useState(null)
    //Hold current html:
    // const [html, setHtml] = useState('')
    //Hold current document name
    // @observable fileName = ''
    // // Hold current folder (bucket):
    // @observable
    // @computed fileRef = this.fileRef || this.storageRef.child(`${folderName}/${fileName}`)

    /**
     * Upload a file for processing
     */
    const upload = (file) => {
        const fileName = file.name
        console.log(`Uploading ${fileName}...`)
        let fileRef = this.storageRef.child(`${folderName}/${fileName}`);
        fileRef.put(file)
            .then(snapshot => alert(!!snapshot
                ? `Yay! File ${fileName} uploaded successfully!`
                : `Fail! ${fileName} could not be uploaded!`))
            .catch((error) => {
                alert(error.message)
            })
    }

    /** Download a file for checkout */
    const download = (fileName) => {
        this.fileName = fileName
        console.log('fileRef', this.fileRef);
        // this.fileRef.child('').getDownloadURL()
    }


    // TODO: pick a method by key: 'Upload/Download', 'Convert', 'Checkout', etc.
    useEffect(() => {
        console.info('Yay, effects!')
    }, [])

    return (
        <CloudFiles.Provider value={{ upload, download }}>
            {props.children}
        </CloudFiles.Provider>
    )
}

export default CloudFilesProvider
