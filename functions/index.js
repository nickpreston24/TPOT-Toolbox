const functions = require('firebase-functions');
const { tpotCrawler } = require('./sitescan');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.scanUrl = functions.https.onRequest((request, response) => {
    // TODO: sanitize the given path so that it's NOT a url, but something from tpot's domain.
    const path = request.body.path;
    const url = `http://www.thepathoftruth.com/${path}`;

    tpotCrawler.crawl(url)

    response.send(`Scanning url ${url}`);
});
