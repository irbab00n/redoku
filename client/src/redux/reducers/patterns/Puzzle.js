import SudokuMatrix from '../../../lib/sudoku/SudokuMatrix';

const Puzzle = () => ({
  error: false,
  errorMessage: '',
  fetched: false,
  fetching: false,
  matrix: new SudokuMatrix(),
  solutions: [],
  storage: {},
  submissionMessage: '',
  failState: false,
  winState: false
});

export default Puzzle;