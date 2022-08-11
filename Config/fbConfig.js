import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBIjanTealEzup7-zFIWQI4ikZWMw6nxG8",
    authDomain: "moexpress-56bf9.firebaseapp.com",
    projectId: "moexpress-56bf9",
    storageBucket: "moexpress-56bf9.appspot.com",
    messagingSenderId: "660334246162",
    appId: "1:660334246162:web:55327bcf375101ecc45bcb"
  };

  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  const auth = firebase.auth()
  export  {firebase,db,auth};