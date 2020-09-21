import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'; // alterar la informacion de la base de datos
admin.initializeApp(functions.config().firebase);
// admin.initializeApp(); // inicializa la base de datos

// const express = require('express');
// const app = express();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.status(200).send("Hello from Firebase!");
});

exports.hello = functions.https.onRequest((req, res) => {
    console.log('functions add...');
    res.status(200).send('Hello Geo...');
});

exports.add = functions.https.onRequest((req, res) => {
    db.collection('items').add({
        text: req.query.text,
    }).then(() => {
        res.status(200).send('Add successful...');
    }).catch(error => console.log('Error add:', error));
});

exports.counter = functions.firestore.document('items/{itemId}').onCreate(() => {
    const doc = db.collection('counter').doc('items');

    return doc.get().then((result: any) => {
        const data = {
            value: result.data().value + 1
        };
        return doc.update(data);
    });
});