import * as types from '../../types';

import Puzzle from '../patterns/Puzzle';
import TimerData from '../patterns/TimerData';

const INITIAL_STATE = () => ({
  puzzle: new Puzzle(),
  timerData: new TimerData()
});

const mainViewReducer = (state = new INITIAL_STATE(), action) => {
  /* Create a mutable copy of the state */
  let newState = Object.assign({}, state);
  
  switch (action.type) {
   
    /* 
      ██████╗ ██╗   ██╗███████╗███████╗██╗     ███████╗
      ██╔══██╗██║   ██║╚══███╔╝╚══███╔╝██║     ██╔════╝
      ██████╔╝██║   ██║  ███╔╝   ███╔╝ ██║     █████╗  
      ██╔═══╝ ██║   ██║ ███╔╝   ███╔╝  ██║     ██╔══╝  
      ██║     ╚██████╔╝███████╗███████╗███████╗███████╗
      ╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝╚══════╝
    */

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
      var row, column;
      [row, column] = action.payload.coordinates.split('-');
      newState.puzzle.matrix[row][column] = action.payload.value;
      return newState;

    case types.SET_MAIN_VIEW_PUZZLE_SUBMISSION_MESSAGE:
      newState.puzzle.submissionMessage = action.payload.message;
      return newState;

    case types.SET_MAIN_VIEW_PUZZLE_FAIL_STATE:
      newState.puzzle.failState = action.payload.flag;
      return newState;

    case types.SET_MAIN_VIEW_PUZZLE_WIN_STATE:
      newState.puzzle.winState = action.payload.flag;
      return newState;

    /* 
      ████████╗██╗███╗   ███╗███████╗██████╗ 
      ╚══██╔══╝██║████╗ ████║██╔════╝██╔══██╗
         ██║   ██║██╔████╔██║█████╗  ██████╔╝
         ██║   ██║██║╚██╔╝██║██╔══╝  ██╔══██╗
         ██║   ██║██║ ╚═╝ ██║███████╗██║  ██║
         ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝
    */

    case types.INCREMENT_MAIN_VIEW_TIMER:
      newState.timerData.elapsedTime += 1;
      return newState;

    case types.RESET_MAIN_VIEW_TIMER:
      newState.timerData = new TimerData();
      return newState;

    case types.SET_MAIN_VIEW_TIMER_ACTIVE:
      newState.timerData.active = action.payload.flag;
      return newState;

    case types.SET_MAIN_VIEW_TIMER:
      newState.timerData.timer = action.payload.timer;
      return newState;
    
    default:
      return newState;
  }

};

export default mainViewReducer;