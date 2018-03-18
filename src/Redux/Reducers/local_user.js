/**
* Reducer returns the default currentUserCredentials object in the global state.
*/
export default function(state = null, action) {
  switch(action.type) {
    case 'LOCAL_USER_SET':
      // console.log(action);
      return action.payload;

    default:
      return state;
  }
}
