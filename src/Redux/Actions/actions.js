// Actions

// Sets isLoggedIn in the global store to the passed in value
export function setLogin(value) {
  return {
    type: 'LOGIN_SET',
    payload: value
  }
}

// Sets the current logged in user credientials for local cache
export function setLocalUser(user) {
  console.log(user);
  return {
    type: 'LOCAL_USER_SET',
    payload: user
  }
}
