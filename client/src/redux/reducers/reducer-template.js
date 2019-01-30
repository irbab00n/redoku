/* Import the types at the top */
import * as types from '../types';
/* Import any necessary modules here */

/* Define the initial state as a Constructor */
const INITIAL_STATE = () => ({
  /* STATE HERE */
});

/* Set the initial state to a new instace of the INITIAL CONSTRUCTOR */
const reducerTemplateReducer = (state = new INITIAL_STATE(), action) => {
  /* Create a mutable copy of the state */
  let newState = Object.assign({}, state);
  
  /* Define how the state changes below */
  switch (action.type) {
    /* 
    
      FOR ASYNCHRONOUS METHODS, THERE SHOULD BE 4 STATES TO KEEP IN MIND

      - FETCH -     Initiates the fetching sequence, sets fetching true, fetched false 
      - FETCHING -  Used in application to indicate work is occurring, MUST be false when fetched is true
      - FETCHED -   Used in application to indicate work has completed, MUST be false when fetching is true
      - ERROR -     If an error occurs, we need to let the user know.
      
      From these 4 fields, 5 general fields can be placed into state:

      ERROR           Flag to control if an error has occurred.  Can be placed inside of the element to render fail state
      ERROR MESSAGE   Can be used in error message boxes
      FETCHED         Will be false when data fetching, true when data arrives successfully
      FETCHING        Will be true when data is fetching, false when data arrives successfully or in error
      STORAGE         General container for data needing to be stored from API fetch

      This produces a structure like so:

        posts: {
          storage: {
            posts: [],
            meta: {
              next_page: null,
              previous_page: null,
            },
          },
          fetched: false,
          fetching: false,
          error: false,
          errorMessage: ''
        }
    
    */
    case types.TEST:
      console.log('reached the reducer template test route: ', action.payload.param);
      return newState;
    
    default:
      return newState;
  }

};

/* Export the completed reducer */
export default reducerTemplateReducer;