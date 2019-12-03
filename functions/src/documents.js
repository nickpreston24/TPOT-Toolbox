// const admin = require('firebase-admin');
// const serviceAccount = require('../service-account.json')
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "tpot-toolbox"
// })

function upload(file) {
    const fileName = 'Death Belongs to Us.docx'
    return firebase
        .storage()
        .ref()
        .child(`checkout/${fileName}`)
        .put(file)
        .then(snapshot => console.log(!!snapshot ? "upload success" : "upload failed"))
}