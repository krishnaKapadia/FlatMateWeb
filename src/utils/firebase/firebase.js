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

/**
* Returns a promise holding an object containing chores and size obj
*/
export function getChores(flatId) {
  return new Promise((resolve, reject) => {
    let obj = {
      chores: [],
      size: 0
    }

    database.ref(`Flats/${flatId}/Chores`).once('value').then((snapshot) => {
      snapshot.forEach((choreObj) => {
        obj.chores.push({
          chore: choreObj.val().chore,
          flatmate: choreObj.val().flatmate,
          time: ''
        });
        obj.size++;
      });
      resolve(obj);
    }).catch((err) => {
      if(err) reject(err);
    });
  });
}
