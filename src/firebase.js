/**
 * @typedef {import('firebase/app').FirebaseApp} FirebaseApp
 * @typedef {import('firebase/firestore').Firestore} Firestore
 * @typedef {import('firebase/auth').Auth} Auth
 */

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore' // For Firestore

const firebaseConfig = {
  apiKey: 'AIzaSyACcayU-12D-4OedO2qklXAs-NIoMsfjR4',
  authDomain: 'alenkajakub-f56f1.firebaseapp.com',
  databaseURL: 'https://alenkajakub-f56f1-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'alenkajakub-f56f1',
  storageBucket: 'alenkajakub-f56f1.appspot.com',
  messagingSenderId: '537884901231',
  appId: '1:537884901231:web:01ff4f3086979bc0bf729a'
}

/** @type {FirebaseApp} */
const app = initializeApp(firebaseConfig)

/** @type {Firestore} */
const db = getFirestore(app) // Firestore

export { db }
