import * as types from '../../types';
import axios from 'axios';
import matrixCompressor from '../../../lib/sudoku/matrixCompressor';
import SudokuMatrix from '../../../lib/sudoku/SudokuMatrix';

/**
 * @todo -UPDATE Development/Production API's will need to be created and updated
 */
const API_URL = process.env.API_URL || 'http://localhost:8080';

/**
 * Fetches a puzzle for the main view 'Quickplay' puzzle
 * @param {Object} params - Will contain key/value pairs for the RESTful API to consume
 */
export const fetchMainViewPuzzle = (params = {}) => {
  return dispatch => {
    dispatch(setMainViewPuzzleMatrixAction(new SudokuMatrix()));
    dispatch(setMainViewPuzzleFetchedAction(false));
    dispatch(setMainViewPuzzleFetchingAction(true));
    axios.get(`${API_URL}/puzzle`, {params})
      .then(response => {
        // console.log('successful response from the puzzles API', response);

        let decompressedPuzzle = matrixCompressor.decompress(response.data.initial, ',');
        // console.log('decompressed puzzle: ', decompressedPuzzle);

        dispatch(setMainViewPuzzleFetchingAction(false));
        dispatch(setMainViewPuzzleStorageAction(response.data));
        dispatch(setMainViewPuzzleMatrixAction(decompressedPuzzle));
        dispatch(setMainViewPuzzleFetchedAction(true));
      })
      .catch(error => {
        console.log('something went wrong while attempting to fetch the puzzle', error);
        dispatch(setMainViewPuzzleErrorAction(false));
        dispatch(setMainViewPuzzleErrorMessageAction(error));
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


// export const updatePuzzleSquare = (coordinates, value) => ({
//   type: types.UPDATE_PUZZLE_SQUARE,
//   payload: {
//     coordinates: coordinates.split('-'),
//     value
//   }
// });