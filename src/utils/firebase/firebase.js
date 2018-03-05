// Firebase Config
import * as Firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCBmYT8iN7fgjZQHoPkqZlLqpFGsauceO8",
    authDomain: "flat-mate-app.firebaseapp.com",
    databaseURL: "https://flat-mate-app.firebaseio.com",
    projectId: "flat-mate-app",
    storageBucket: "flat-mate-app.appspot.com",
    messagingSenderId: "803035832572"
  };

Firebase.initializeApp(config);

export default Firebase;
