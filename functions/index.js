const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


exports.addMessage = functions.https.onRequest(async (request, response) => {
    const original = request.query.text;
    const snapshot = await admin.database().ref('/messages').push({ original });
    
    response.redirect(303, snapshot.ref.toString())    
})

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });

exports.storeMessage = functions.https.onRequest(async(request,response) => {
    const original = request.query.text;
    
    const snapshot2 = await admin.firestore().ref('/messages').push({ original }); //firestore is not called this way.
    response.redirect(303, snapshot2.ref.toString())

})