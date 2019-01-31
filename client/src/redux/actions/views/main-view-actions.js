import * as types from '../types';

export const updatePuzzleSquare = (coordinates, value) => ({
  type: types.UPDATE_PUZZLE_SQUARE,
  payload: {
    coordinates: coordinates.split('-'),
    value
  }
});