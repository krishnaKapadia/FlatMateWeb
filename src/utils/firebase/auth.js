import firebase from "./firebase";

var auth = firebase.auth();

export default auth;

/**
* Registers a new flatmate with firebase
*/
export const registerWithLocalCredentials = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
}

/**
* Logs in a user with firebase auth
*/
export const loginWithLocalCredentials = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
}

/**
* Signs out the user
*/
export const signOut = () => {
  console.log("SIGNOUT");
  return auth.signOut();
}

/**
* Resets the users password
*/
export const resetPassword = (email) => {
  return auth.sendPasswordResetEmail(email);
}

/**
* Updates the users password
*/
export const updatePassword = (password) => {
  return auth.currentUser.updatePassword(password);
}
