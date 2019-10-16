import firebase from 'firebase';




const config = {
    
    authDomain: "flimse-json-db.firebaseapp.com",
    databaseURL: "https://flimse-json-db.firebaseio.com",
    projectId: "flimse-json-db",
    storageBucket: "flimse-json-db.appspot.com",
    messagingSenderId: "794788708493"
  };
  
  const firebaseApp = firebase.initializeApp(config);

  export default firebaseApp.firestore();   

