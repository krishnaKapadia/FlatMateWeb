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

/**
* Returns a promsie holding an object that contains all the faltmates associated
* with the flatid
*/
export function getFlatMates(flatId) {

  return new Promise((resolve, reject) => {
    let container = {
      flatmates: [],
      size: 0
    }

    var count = 0;

    database.ref(`Flats/${flatId}/Flatmates`).once('value').then((snapshot) => {
      snapshot.forEach((flatmate) => {
        const data = flatmate.val();

        container.flatmates.push({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: data.fullName,
          flatKey: data.flatKey
          // flatmate
        });
        container.size++;
      });
      resolve(container);
    }).catch((err) => {
      if(err) return reject(err);
    })
  })
}
