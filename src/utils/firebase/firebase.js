// Firebase Config
import * as Firebase from 'firebase';
require("firebase/firestore");


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
database = Firebase.firestore();
// Messaging setup

// Token request
const messageService = Firebase.messaging();
// messageService.requestPermission().then(() => {
//   console.log("Permission Granted");
//   return messageService.getToken();
// }).then((token) => {
//   console.log(token);
// }).catch((err) => {
//   if(err) console.log(err);
// })


export default Firebase;



// TODO refactor these methods into a different folder and file


/**
* Returns a promise holding an object containing chores and size obj
*/
export function getChores(flatId) {
  return new Promise((resolve, reject) => {
    let obj = {
      chores: [],
      size: 0
    }

    database.collection(`Flats/${flatId}/Chores`).get().then((snapshot) => {
      snapshot.forEach((choreObj) => {
        obj.chores.push({
          chore: choreObj.data().chore,
          flatmate: choreObj.data().flatmate,
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
* Given the user id, get the corresponding user from the database
*/
export function getUser(userId) {
  return new Promise((resolve, reject) => {
    database.doc(`Users/${userId}`).get().then((data) => {
      if(data.exists) {
        resolve(data.data());
      }else {
        reject("User not found");
      }
    }).catch((err) => {
      if(err) reject(err);
    })
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

    database.collection(`Flats/${flatId}/Flatmates`).get().then((snapshot) => {
      snapshot.forEach((flatmate) => {
        const data = flatmate.data();

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
