import * as types from '../../types';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8080';

export const fetchMainViewPuzzle = (params = {}) => {
  return dispatch => {
    axios.get(`${API_URL}/puzzle`, {params})
      .then(response => {
        console.log('successful response from the puzzles API', response);
      })
      .catch(error => {
        console.log('something went wrong while attempting to fetch the puzzle', error);
      });
  };
};

// export const updatePuzzleSquare = (coordinates, value) => ({
//   type: types.UPDATE_PUZZLE_SQUARE,
//   payload: {
//     coordinates: coordinates.split('-'),
//     value
//   }
// });