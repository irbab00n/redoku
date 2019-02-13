import * as types from '../../types';
import store from '../../store';
import axios from 'axios';
import Timer from '../../../lib/classes/Timer';
import matrixCompressor from '../../../lib/sudoku/matrixCompressor';
import SudokuMatrix from '../../../lib/sudoku/SudokuMatrix';
import { checkGrid } from '../../../lib/sudoku/sudoku';

const API_URL = process.env.API_URL || 'http://localhost:8080';


/* 
██████╗ ██╗   ██╗███████╗███████╗██╗     ███████╗     █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔══██╗██║   ██║╚══███╔╝╚══███╔╝██║     ██╔════╝    ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
██████╔╝██║   ██║  ███╔╝   ███╔╝ ██║     █████╗      ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
██╔═══╝ ██║   ██║ ███╔╝   ███╔╝  ██║     ██╔══╝      ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║     ╚██████╔╝███████╗███████╗███████╗███████╗    ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝╚══════╝    ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝                                                                                                          
*/

// CHECK_MAIN_VIEW_PUZZLE_SOLUTION
/**
 * Submits the puzzle for solution
 * @param {Matrix} matrix - Matrix storage of the current puzzle solution
 */
export const checkMainViewPuzzleSolution = matrix => {
  let { completed, testResult } = checkGrid(matrix);
  console.log('was the puzzle completed?: ', completed);
  console.log('does it pass sudoku rules?: ', testResult);

  return dispatch => {
    // if the test is completed and the test result is valid
    if (completed && testResult) {
      const { puzzle } = store.getState().views.main;
      // Trigger on the 'submitting' state -- Use to conditionally render 'Some work is happening'

      console.log('puzzle solution: ', puzzle);
      // Save the solution
      // Trigger the win state
      
      let data = {
        solution: {
          puzzle_id: puzzle.storage.id,
          solution: matrixCompressor.compress(puzzle.matrix)
        }
      };
      
      axios.post(`${API_URL}/solution/create`, data)
      .then(response => {
          dispatch(setMainViewPuzzleWinStateAction(true));
          dispatch(setMainViewPuzzleSubmissionMessageAction(`You win!`));
          console.log('successfully posted to solution create endpoint: ', response.data);
        })
        .catch(error => {
          console.log('Something went wrong while attempting to create a new solution: ', error);
        });
    }

    // if the test is not completed and the test result is not valid
    if (!completed || !testResult) {
      // Set the fail state to true, and the win state to false
      dispatch(setMainViewPuzzleFailStateAction(true));
      dispatch(setMainViewPuzzleWinStateAction(false));
      dispatch(setMainViewPuzzleSubmissionMessageAction(`You've got some work left to do!`));
    }
  };
};

/**
 * Fetches a puzzle for the main view 'Quickplay' puzzle
 * @param {Object} params - Will contain key/value pairs for the RESTful API to consume
 */
export const fetchMainViewPuzzle = (params = {}) => {

  return dispatch => {
    const { timerData } = store.getState().views.main;

    if (timerData.timer !== null) {
      let oldTimerDelay = timerData.timer.delay;
      let oldTimerOptions = timerData.timer.options;
      let newTimer = new Timer(oldTimerDelay, oldTimerOptions);
      dispatch(resetMainViewTimerAction(newTimer));
    }

    dispatch(setMainViewPuzzleMatrixAction(new SudokuMatrix()));  // Clear the current puzzle out of state
    dispatch(setMainViewPuzzleFetchedAction(false));  // Set the fetched state to false
    dispatch(setMainViewPuzzleFetchingAction(true));  // Set the fetching state to true
    dispatch(setMainViewPuzzleSubmissionMessage(''));  // Reset the submission message
    dispatch(setMainViewPuzzleFailStateAction(false));  // Reset the 'fail' state
    dispatch(setMainViewPuzzleWinStateAction(false));  // Reset the 'win' state
    // Reset the timer

    // -- pull out the old options object, instantiate new Timer with them
    axios.get(`${API_URL}/puzzle`, {params})  // Go get the puzzle using the supplied params
      .then(response => {
        // console.log('successful response from the puzzles API', response);
        let decompressedPuzzle = matrixCompressor.decompress(response.data.initial, ',');  // Decompress the puzzle
        dispatch(setMainViewPuzzleFetchingAction(false));  // Set the fetching state to false
        dispatch(setMainViewPuzzleStorageAction(response.data));  // Store the puzzle data in state
        dispatch(setMainViewPuzzleMatrixAction(decompressedPuzzle));  // Set the puzzle matrix to the decompressed puzzle
        dispatch(setMainViewPuzzleFetchedAction(true));  // Set the fetched state to true
      })
      .catch(error => {
        console.log('something went wrong while attempting to fetch the puzzle', error);
        dispatch(setMainViewPuzzleErrorAction(true));  // Set the error state to true
        dispatch(setMainViewPuzzleErrorMessageAction(error));  // Set the Error Message to the error retrieved
      });
  };
};

// SET_MAIN_VIEW_PUZZLE_ERROR
/**
 * Sets the application flag that an error has occurred while fetching a puzzle
 * @param {Boolean} flag - Can be either 'true' or 'false'
 */
export const setMainViewPuzzleError = flag => {
  return dispatch => dispatch(setMainViewPuzzleErrorAction(flag));
};
const setMainViewPuzzleErrorAction = flag => ({
  type: types.SET_MAIN_VIEW_PUZZLE_ERROR,
  payload: {
    flag
  }
});


// SET_MAIN_VIEW_PUZZLE_ERROR_MESSAGE
/**
 * Stores the error message returned from attempting to fetch a puzzle
 * @param {String} message - Will be an error message string
 */
export const setMainViewPuzzleErrorMessage = message => {
  return dispatch => dispatch(setMainViewPuzzleErrorMessageAction(message));
};
const setMainViewPuzzleErrorMessageAction = message => ({
  type: types.SET_MAIN_VIEW_PUZZLE_ERROR_MESSAGE,
  payload: {
    message
  }
})


// SET_MAIN_VIEW_PUZZLE_FETCHED
/**
 * Sets the state of whether or not data has fetched successfully
 * Handles the case where results are empty but we still need to know
 * when the data has been retrieved successfully
 * @param {Boolean} flag - Can be either 'true' or 'false'
 */
export const setMainViewPuzzleFetched = flag => {
  return dispatch => dispatch(setMainViewPuzzleFetchedAction(flag));
};
const setMainViewPuzzleFetchedAction = flag => ({
  type: types.SET_MAIN_VIEW_PUZZLE_FETCHED,
  payload: {
    flag
  }
});


// SET_MAIN_VIEW_PUZZLE_FETCHING
/**
 * Used to store the state of async work still being done
 * @param {Boolean} flag - Can be either 'true' or 'false'
 */
export const setMainViewPuzzleFetching = flag => {
  return dispatch => dispatch(setMainViewPuzzleFetchingAction(flag));
};
const setMainViewPuzzleFetchingAction = flag => ({
  type: types.SET_MAIN_VIEW_PUZZLE_FETCHING,
  payload: {
    flag
  }
});


// SET_MAIN_VIEW_PUZZLE_MATRIX
/**
 * Sets the puzzle matrix in state
 * @param {Array} matrix - 9 x 9 Matrix representing a Sudoku puzzle grid
 */
export const setMainViewPuzzleMatrix = matrix => {
  return dispatch => dispatch(setMainViewPuzzleMatrixAction(matrix));
};
const setMainViewPuzzleMatrixAction = matrix => ({
  type: types.SET_MAIN_VIEW_PUZZLE_MATRIX,
  payload: {
    matrix
  }
});


// SET_MAIN_VIEW_PUZZLE_STORAGE
/**
 * Stores the data retrieved from the puzzles API
 * @param {Object} data - Puzzle data object retrieved from API
 */
export const setMainViewPuzzleStorage = data => {
  return dispatch => dispatch(setMainViewPuzzleStorageAction(data));
};
const setMainViewPuzzleStorageAction = data => ({
  type: types.SET_MAIN_VIEW_PUZZLE_STORAGE,
  payload: {
    data
  }
});


// SET_MAIN_VIEW_PUZZLE_SQUARE
/**
 * Provides a coordinate to update in the puzzle matrix to the supplied value
 * @param {String} coordinates - Target coordinates to update to the value to
 * @param {String} value - Value to update the target coordinates to
 */
export const setMainViewPuzzleSquare = (coordinates, value) => {
  return dispatch => dispatch(setMainViewPuzzleSquareAction(coordinates, value));
};
const setMainViewPuzzleSquareAction = (coordinates, value) => ({
  type: types.SET_MAIN_VIEW_PUZZLE_SQUARE,
  payload: {
    coordinates,
    value
  }
});


// SET_MAIN_VIEW_PUZZLE_SUBMISSION_MESSAGE
/**
 * Manages the puzzle submission messasge
 * @param {String} message - Message to show the user when they submit the puzzle
 */
export const setMainViewPuzzleSubmissionMessage = message => {
  return dispatch => dispatch(setMainViewPuzzleSubmissionMessageAction(message));
};
const setMainViewPuzzleSubmissionMessageAction = message => ({
  type: types.SET_MAIN_VIEW_PUZZLE_SUBMISSION_MESSAGE,
  payload: {
    message
  }
});


// SET_MAIN_VIEW_PUZZLE_FAIL_STATE
/**
 * Responsible for controlling the 'Fail' state of the application
 * @param {Boolean} flag - Can be either 'true' or 'false'
 */
export const setMainViewPuzzleFailState = flag => {
  return dispatch => dispatch(setMainViewPuzzleFailStateAction(flag));
};
const setMainViewPuzzleFailStateAction = flag => ({
  type: types.SET_MAIN_VIEW_PUZZLE_FAIL_STATE,
  payload: {
    flag
  }
});


// SET_MAIN_VIEW_PUZZLE_WIN_STATE
/**
 * Responsible for controlling the 'Win' state of the application
 * @param {Boolean} flag - Can be either 'true' or 'false'
 */
export const setMainViewPuzzleWinState = flag => {
  return dispatch => dispatch(setMainViewPuzzleWinStateAction(flag));
};
const setMainViewPuzzleWinStateAction = flag => ({
  type: types.SET_MAIN_VIEW_PUZZLE_WIN_STATE,
  payload: {
    flag
  }
});

/*
████████╗██╗███╗   ███╗███████╗██████╗      █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
╚══██╔══╝██║████╗ ████║██╔════╝██╔══██╗    ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
   ██║   ██║██╔████╔██║█████╗  ██████╔╝    ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
   ██║   ██║██║╚██╔╝██║██╔══╝  ██╔══██╗    ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
   ██║   ██║██║ ╚═╝ ██║███████╗██║  ██║    ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
*/

// INCREMENT_MAIN_VIEW_TIMER
/**
 * Increments the timer value stored in state
 */
export const incrementMainViewTimer = () => {
  return dispatch => dispatch(incrementMainViewTimerAction());
};
const incrementMainViewTimerAction = () => ({
  type: types.INCREMENT_MAIN_VIEW_TIMER
});

// RESET_MAIN_VIEW_TIMER
/**
 * Resets the timer value stored in state
 */
export const resetMainViewTimer = timer => {
  return dispatch => dispatch(resetMainViewTimerAction(timer));
};
const resetMainViewTimerAction = timer => ({
  type: types.RESET_MAIN_VIEW_TIMER,
  payload: {
    timer
  }
});


// SET_MAIN_VIEW_TIMER_ACTIVE
export const setMainViewTimerActive = flag => {
  return dispatch => dispatch(setMainViewTimerActiveAction(flag));
};
const setMainViewTimerActiveAction = flag => ({
  type: types.SET_MAIN_VIEW_TIMER_ACTIVE,
  payload: {
    flag
  }
});


// SET_MAIN_VIEW_TIMER_STARTED
export const setMainViewTimerStarted = flag => {
  return dispatch => dispatch(setMainViewTimerStartedAction(flag));
};
const setMainViewTimerStartedAction = flag => ({
  type: types.SET_MAIN_VIEW_TIMER_STARTED,
  payload: {
    flag
  }
})


// SET_MAIN_VIEW_TIMER
export const setMainViewTimer = timer => {
  return dispatch => dispatch(setMainViewTimerAction(timer));
};
const setMainViewTimerAction = timer => ({
  type: types.SET_MAIN_VIEW_TIMER,
  payload: {
    timer
  }
});