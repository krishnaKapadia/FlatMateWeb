const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/**
* Called on when a user is invited
*/
exports.invite = functions.https.onRequest((req, res) => {
  // console.log(`Invited to flat number ${req}` );
  console.log(req);
  res.send({
    status: 500,
    successful: true,
    flatId: 'lansdkjnasdnad'
  })
});
