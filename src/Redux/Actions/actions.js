// Actions

// Sets isLoggedIn in the global store to the passed in value
export function setLogin(value) {
  return {
    type: 'LOGIN_SET',
    payload: value
  }
}
