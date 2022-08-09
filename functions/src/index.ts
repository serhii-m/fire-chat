import firebase from 'firebase/compat';
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import { EventContext } from 'firebase-functions';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Filter = require('bad-words');

admin.initializeApp();

exports.filterBadWords = functions.firestore
  .document('messages/{msgId}')
  .onCreate(async (doc: QueryDocumentSnapshot, ctx: EventContext) => {
    const filter = new Filter();
    const { text } = doc.data();

    if (filter.isProfane(text)) {
      await doc.ref.update({
        text: 'the message was deleted for profanity 🤐',
      });
    }
  });
