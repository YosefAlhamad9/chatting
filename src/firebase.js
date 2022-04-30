import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB-SF55FDcx-aXle_WQMnfIp7d1uMtfIVs",
    authDomain: "chat-app-54a6c.firebaseapp.com",
    projectId: "chat-app-54a6c",
    storageBucket: "chat-app-54a6c.appspot.com",
    messagingSenderId: "417798841812",
    appId: "1:417798841812:web:4979d64ed00504c40b6241",
    measurementId: "G-WJZELK5VFM"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {auth , provider} ;
  export default db;