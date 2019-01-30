/* Import types at the top */
import * as types from '../../../types';
/* Any modules required for these actions */

/* --- ACTION CREATORS PLACED HERE --- */
const exampleMethodAction = (param) => ({
  /* Declare your type */
  type: types.TEST,
  /* Always contain values inside of the 'payload' property */
  payload: {
    param
  }
});

/* --- ACTIONS PLACED HERE --- */
export const exampleMethod = (param) => {
  // Return a function that will have the dispatch mapped to it
  return dispatch => {
    /* Do some action here, either synchronous or asynchronous */
    /* At some point, you must dispatch the action creator */
    dispatch(exampleMethodAction(param));
  };
};