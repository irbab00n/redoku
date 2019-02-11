import SudokuMatrix from '../../../lib/sudoku/SudokuMatrix';

const Puzzle = () => ({
  error: false,
  errorMessage: '',
  fetched: false,
  fetching: false,
  matrix: new SudokuMatrix(),
  storage: {},
  submissionMessage: '',
  failState: false,
  winState: false
});

export default Puzzle;