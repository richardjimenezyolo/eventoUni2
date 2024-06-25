// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3Vzzrh9gduol3a4CJRl3xLidI6Qz9ATU',
  authDomain: 'eventouni-9ad02.firebaseapp.com',
  projectId: 'eventouni-9ad02',
  storageBucket: 'eventouni-9ad02.appspot.com',
  messagingSenderId: '816194679463',
  appId: '1:816194679463:web:8c438819da3cba8fc86182'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { app, db, auth }
