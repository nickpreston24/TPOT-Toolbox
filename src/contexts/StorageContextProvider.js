/**
 * Firebase Storage Provider
 * Intent: Wrap any component with the ability to do CRUD
 * with Firebase Storage
 */

import React, { useState, useEffect } from 'react'
export const StorageContext = React.createContext()
const firebaseApiKey = process.env.REACT_APP_FIREBASE_STORAGE_API_KEY || null

if (!firebaseApiKey) {
    console.warn('Invalid api key, could not initialize this context!');
}

const StorageContextProvider = (props) => {

    //Hold current document:
    const [document, setDocument] = useState(null)
    //Hold current html:
    const [html, setHtml] = useState('')

    /**
     * Upload a file for processing
     */
    const upload = (folderName, file) => {
        let translationRef = this.storageRef.child(`${folderName}/${file.name}`);
        translationRef.put(file)
            .then(snapshot => alert(!!snapshot
                ? `Yay! File ${file.name} uploaded successfully!`
                : `Fail! ${file.name} could not be uploaded!`))
            .catch((error) => {
                console.log('Error! ', error)
                alert(error.message)
            })
    }

    //TODO: pick a method by key: 'Upload/Download', 'Convert', 'Checkout', etc.
    useEffect(() => {
        console.info('Yay, effects!')
    }, [])

    return (
        <StorageContext.Provider value={{ api: { upload }, states: { document, html } }}>
            {props.children}
        </StorageContext.Provider>
    )
}

export default StorageContextProvider