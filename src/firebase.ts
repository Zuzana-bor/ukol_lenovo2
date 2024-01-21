// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB5a1dFc4Er95iD_vWxi9SBnDNvHVS_6nM',
  authDomain: 'fit-body-f00f1.firebaseapp.com',
  projectId: 'fit-body-f00f1',
  storageBucket: 'fit-body-f00f1.appspot.com',
  messagingSenderId: '935350277004',
  appId: '1:935350277004:web:466ab1ada06ccc672b3ca9',
  measurementId: 'G-GHKLDGEKYT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
