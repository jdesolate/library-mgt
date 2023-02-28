// Import the functions you need from the SDKs you need
const firebaseConfig = {
  apiKey: process.env['REACT_FIREBASE_API_KEY'],
  appId: process.env['REACT_FIREBASE_APP_ID'],
  authDomain: process.env['REACT_FIREBASE_AUTH_DOMAIN'],
  messagingSenderId: process.env['REACT_FIREBASE_API_MESSAGING_SENDER_ID'],
  projectId: process.env['REACT_FIREBASE_PROJECT_ID'],
  storageBucket: process.env['REACT_FIREBASE_API_STORAGE_BUCKET'],
};

export default firebaseConfig;

