// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// import 'firebase/database'
import 'dotenv/config'
import {getDatabase} from 'firebase/database'

// https://firebase.google.com/docs/web/setup#available-libraries

// config()

const firebaseConfig = {
  apiKey: 'AIzaSyDvh-2JRYEGskpzCbKr2mjSgwL0Hh7mlC8',
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
const analytics = getAnalytics(app)
const db = getFirestore()
const orderDetails = getDatabase(app)

export {auth, app, analytics, db, orderDetails}
