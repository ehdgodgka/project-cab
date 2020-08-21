// This import loads the firebase namespace.
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
console.log(process.env.REACT_APP_FIREBASE_KEY);
const firebaseApiKey = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'my-projects-38490.firebaseapp.com',
  databaseURL: 'https://my-projects-38490.firebaseio.com',
  projectId: 'my-projects-38490',
  storageBucket: 'my-projects-38490.appspot.com',
  messagingSenderId: '682422128669',
  appId: '1:682422128669:web:b020618013505d8717b6f4'
};

// Your web app's Firebase configuration
var firebaseConfig = firebaseApiKey;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const projectFirestore = firebase.firestore();
export const projectStorage = firebase.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
