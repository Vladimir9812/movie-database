import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCdoWuT-FKvkQHSWdKMavL1YF7R1ajUyH4",
    authDomain: "auth-153fe.firebaseapp.com",
    databaseURL: "https://auth-153fe.firebaseio.com",
    projectId: "auth-153fe",
    storageBucket: "auth-153fe.appspot.com",
    messagingSenderId: "902042783699",
    appId: "1:902042783699:web:8524bde17408c698292926",
    measurementId: "G-ECGF4DQ9G4"
  };

   const fire = firebase.initializeApp(firebaseConfig);
  
export default fire