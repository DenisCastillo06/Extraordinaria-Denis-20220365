// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyC8uCto9RVUYWjoMTRFsmAc2wKge9XJKb8",
  authDomain: "extraordinaria-denis.firebaseapp.com",
  projectId: "extraordinaria-denis",
  storageBucket: "extraordinaria-denis.firebasestorage.app",
  messagingSenderId: "806581293933",
  appId: "1:806581293933:web:0e16d6414654a78400c064"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); */
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, TEST } from '@env';
 
console.log(TEST);
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    test: TEST
};
 
// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} else {
  app = getApp();
  console.log('Firebase already initialized');
}
 
const database = getFirestore(app);
if (database) {
  console.log('Firestore initialized correctly');
} else {
  console.log('Firestore initialization failed');
}
 
const storage = getStorage(app);
if (storage) {
  console.log('storage initialized correctly');
} else {
  console.log('storage initialization failed');
}
 
const authentication = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
console.log(firebaseConfig);
export { database, storage, authentication };