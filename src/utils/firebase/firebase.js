// Firebase Config
import * as Firebase from 'firebase';
var database;

const config = {
  apiKey: "AIzaSyCBmYT8iN7fgjZQHoPkqZlLqpFGsauceO8",
  authDomain: "flat-mate-app.firebaseapp.com",
  databaseURL: "https://flat-mate-app.firebaseio.com",
  projectId: "flat-mate-app",
  storageBucket: "flat-mate-app.appspot.com",
  messagingSenderId: "803035832572"
};

Firebase.initializeApp(config);
database = Firebase.database();
export default Firebase;

export const getChores = (flatId) => {
  database.ref(`Flats/${flatId}/Chores`).once('value', (snapshot) => {
    var chores = [];
    var size = 0;

    snapshot.forEach((choreObj) => {
      chores.push({
        chore: choreObj.val().chore,
        flatmate: choreObj.val().flatmate,
        time: ''
      });
      size++;
    });

    // console.log(chores);
    return {
      chores: chores,
      size: size
    };
  });
}
