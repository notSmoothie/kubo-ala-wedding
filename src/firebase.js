/**
 * @typedef {import('firebase/app').FirebaseApp} FirebaseApp
 * @typedef {import('firebase/firestore').Firestore} Firestore
 * @typedef {import('firebase/auth').Auth} Auth
 */

import { initializeApp } from 'firebase/app'

import {
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore' // For Firestore
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth' // For Authentication

const firebaseConfig = {
  apiKey: 'AIzaSyA3OoyNCfu5_Who8iK_GUDwawCrPHE3Dls',
  authDomain: 'alenkajakub-f56f1.firebaseapp.com',
  databaseURL: 'https://alenkajakub-f56f1-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'alenkajakub-f56f1',
  storageBucket: 'alenkajakub-f56f1.appspot.com',
  messagingSenderId: '537884901231',
  appId: '1:537884901231:web:01ff4f3086979bc0bf729a'
}

/** @type {FirebaseApp} */
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const googleSignin = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      return { credential, token, user }
    })
    .catch((error) => {
      console.log(error)
    })
}

const checkAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user)
    } else {
      callback(null)
    }
  })
}

/** @type {Firestore} */
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
    tabManager: persistentMultipleTabManager()
  })
}) // Firestore

export { db, googleSignin, checkAuthState }
