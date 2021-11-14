import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyBESqmiU6Ua4od09ZUraKRQw7c9fTyG4lE",
    authDomain: "netflix2-d9ff7.firebaseapp.com",
    projectId: "netflix2-d9ff7",
    storageBucket: "netflix2-d9ff7.appspot.com",
    messagingSenderId: "322679342773",
    appId: "1:322679342773:web:cec109b8ba7b26ab2020fc",
    measurementId: "G-4EV9504773"
  };

  firebase.initializeApp(firebaseConfig)
  const storage=firebase.storage()
  export default storage;