import firebase from 'firebase/app';
import "firebase/database";

 var firebaseConfig = {
    apiKey: "AIzaSyDgHTuw9DSTiPDGnYf7P9UdR01QEtufe5U",
    authDomain: "not-zizi.firebaseapp.com",
    databaseURL: "https://not-zizi-default-rtdb.firebaseio.com",
    projectId: "not-zizi",
    storageBucket: "not-zizi.appspot.com",
    messagingSenderId: "196461615832",
    appId: "1:196461615832:web:2a3883cbd73446be31d5ad",
    measurementId: "G-RTKCEQZT7D"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var userRef = firebase.database().ref("user");
  var habitRef = userRef.child('1').child('habit').child('1');
  var habitLogRef = habitRef.child('1');
  var missedLogRef = firebase.database().ref("/user/1/habit/missedLog");
  export {
      userRef,
      habitRef,
      habitLogRef,
      missedLogRef
  }