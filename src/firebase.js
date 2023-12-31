// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import {getAuth, setPersistence, browserLocalPersistence} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import 'dotenv/config'

// https://firebase.google.com/docs/web/setup#available-libraries

// config()

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth()
setPersistence(auth, browserLocalPersistence)
const analytics = getAnalytics(app)
const db = getFirestore()

export {auth, app, analytics, db}
