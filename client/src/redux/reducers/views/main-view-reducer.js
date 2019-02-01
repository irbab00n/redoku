import * as types from '../../types';
import SudokuMatrix from '../../../lib/sudoku/SudokuMatrix';

const INITIAL_STATE = () => ({
  puzzle: {
    fetched: false,
    fetching: false,
    error: false,
    errorMessage: '',
    matrix: new SudokuMatrix(),
    storage: {}
  }
});

const mainViewReducer = (state = new INITIAL_STATE(), action) => {
  /* Create a mutable copy of the state */
  let newState = Object.assign({}, state);
  
  switch (action.type) {
   
    case types.SET_MAIN_VIEW_PUZZLE_FETCHED:
      newState.puzzle.fetched = action.payload.flag;
      return newState;

    case types.SET_MAIN_VIEW_PUZZLE_FETCHING:
      newState.puzzle.fetching = action.payload.flag;
      return newState;
    
    case types.SET_MAIN_VIEW_PUZZLE_ERROR:
      newState.puzzle.error = action.payload.flag;
      return newState;

    case types.SET_MAIN_VIEW_PUZZLE_ERROR_MESSAGE:
      newState.puzzle.errorMessage = action.payload.message;
      return newState;

    case types.SET_MAIN_VIEW_PUZZLE_STORAGE:
      newState.puzzle.storage = action.payload.data;
      return newState;
    
    case types.SET_MAIN_VIEW_PUZZLE_MATRIX:
      newState.puzzle.matrix = action.payload.matrix;
      return newState;

    case types.SET_MAIN_VIEW_PUZZLE_SQUARE:
      let row, column;

      [row, column] = action.payload.coordinates.split('-');
      
      newState.puzzle.matrix[row][column] = action.payload.value;
      return newState;
    
    default:
      return newState;
  }

};

export default mainViewReducer;