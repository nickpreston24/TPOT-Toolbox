/**
 * Firebase Storage Provider
 * Intent: Wrap any component with the ability to do CRUD
 * with Firebase Storage
 */

import React, { useState, useEffect } from 'react'
import firebase from 'firebase';
// import { observable, action, computed } from 'mobx'

export const CloudFiles = React.createContext()
const firebaseApiKey = process.env.REACT_APP_FIREBASE_STORAGE_API_KEY || null

if (!firebaseApiKey) {
    console.warn('Invalid api key, could not initialize this context!');
}

const storageRef = firebase.storage().ref();
const folderName = 'originals'

/**
 * Cloud File Provider
 * Allows any subscribers to interact with Cloud Storage files
 */
const CloudFilesProvider = (props) => {   

    const upload = (file) => {
        let fileRef = storageRef.child(`${folderName}/${file.name}`);
        fileRef.put(file)
            .then(snapshot => alert(!!snapshot
                ? `Yay! File ${file.name} uploaded successfully!`
                : `Fail! ${file.name} could not be uploaded!`))
            .catch((error) => {
                alert(error.message)
            })
    }

    /** Download a file for checkout */
    const download = (fileName) => {
        // console.log('fileRef', fileRef);
        // fileRef.child('').getDownloadURL()
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
