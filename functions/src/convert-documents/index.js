const convertToHtml = require('../../../src/shared/utilities/converter').convertFile

/**
 * Upload a given file to Firebase Storage
 */
function upload(file) {
    const fileName = file.name || null;
    return firebase
        .storage()
        .ref()
        .child(`process/${fileName}`)
        .put(file)
        .then(snapshot => console.log(!!snapshot ? "upload success" : "upload failed"))
}

/**
 * TODO: Download the given file to server
 */
function download(file) {
    //TODO: Download the actual file contents (docx) from Firebase Storage and return the result
}


/**
 * TODO: Convert a given file from docx to html
 * TODO: Make this a triggered piece of code, possibly /triggers/conversion.js
 */
function convert(file) {
    //TODO: Download the actual file contents (docx)
    //TODO: convert the file.    
    convertToHtml(file)
        .then((html) => {
            console.log('Conversion result: \n', html)
            //TODO: Upload converter html file back to Firebase Storage
            // htmlRef.Upload(html) ...
        }).catch(console.error);
}