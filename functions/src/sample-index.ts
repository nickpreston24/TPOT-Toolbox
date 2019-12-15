import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

main.use('api/v1', app);
main.use(bodyParser.json());

// const admin = require('firebase-admin');
// const environment = require('./environments/environment.js')
// const functions = require('firebase-functions')


// import app from './app';const note = App;
// export { note }

import notes from './src/notes';

export const webApi = functions.https.onRequest(main);