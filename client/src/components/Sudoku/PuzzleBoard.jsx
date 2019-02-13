import React from 'react';
import { connect } from 'react-redux';
import dispatchMappedActions from '../../redux/dispatchMappedActions';

import PuzzleSquare from './PuzzleSquare';
import PuzzleSubmission from './PuzzleSubmission';

import matrixCompressor from '../../lib/sudoku/matrixCompressor';

class PuzzleBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.buildPuzzle = this.buildPuzzle.bind(this);
    this.determineBackground = this.determineBackground.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { puzzle } = nextProps;
    let updatedState = {};
    let delay = 1000;

    if (puzzle.failState) {
      setTimeout(() => {
        this.props.actions.setMainViewPuzzleFailState(false);
      }, delay);
    }

    // if (puzzle.winState) {
    //   setTimeout(() => {
    //     this.props.actions.setMainViewPuzzleWinState(false);
    //   }, delay);
    // }

    if (Object.keys(updatedState).length > 0) {
      this.setState(updatedState);
    }

    return true;
  }

  /**
   * Colors the board with the style of a Sudoku board
   * @param {String} row    - Index representing the horizontal grid line
   * @param {String} column - Index representing the vertical grid line
   * @returns {String} - Class name assigning a background color to the square
   */
  determineBackground(row, column) {
    const alternates = '345'; // Range of numbers to compare row and column indecies against

    let rowCheck = alternates.includes(row); // Will be true if the row is in Array position 3-5
    let columnCheck = alternates.includes(column); // Will be true if the column is in Array position 3-5

    // If within the center 3x3 grid
    if (rowCheck && columnCheck) {
      // apply the standard background
      return 'grid-bg-normal';
    }

    // If not in the center, but either the row or column is within the color range
    if (rowCheck || columnCheck) {
      // apply the alternate background
      return 'grid-bg-alt';
    }

    // apply the standard background by default
    return 'grid-bg-normal';
  }
  
  /**
   * Generates the Puzzle Square elements
   * Initializes and increments row and column counters
   * Uses the background determination function
   * @returns {Array} of PuzzleSquare elements
   */
  buildPuzzle(puzzle) {
    const sudokuSizeLimit = 8; // Array index representation of a Sudoku puzzle size (9 x 9 squares), 
    // console.log('puzzle on board: ', puzzle);
    const initialPuzzleMatrix = matrixCompressor.decompress(puzzle.storage.initial);

    let row = 0; // Row counter
    let column = 0; // Column counter
    let elements = []; // Built element storage
    /* 
      Use 'while' loop that terminates with a 'break' statement
      This best suits the needs of assigning the elements
    */
    while (true) {
      let assignedValue = puzzle.matrix[row][column]; // grab the assigned value out of the puzzle matrix
      let isInitialValue = initialPuzzleMatrix[row][column] !== ''; // if the value in the inital matrix isn't empty

      // Create a new PuzzleSquare, and assign the coordinates and background
      let assignedElement = (
        <PuzzleSquare 
          key={`${row}${column}`} 
          coordinates={`${row}-${column}`} 
          background={this.determineBackground(row, column)}
          value={assignedValue}
          updateFunction={isInitialValue ? () => {} : this.props.updateFunction}
          isInitialValue={isInitialValue}
          timerData={this.props.timerData}
        />
      );

      // Push the assigned element into the collection to return
      elements.push(assignedElement);

      // If the column and row have both reached the sudoku size limit
      if (column === sudokuSizeLimit && row === sudokuSizeLimit) {
        break;
      }

      column === sudokuSizeLimit ? (column = 0, row++): column++;
    }
    return elements;
  }

  render() {
    const { checkSolutionFunction, puzzle, timerData } = this.props;

    // console.log('current puzzle matrix: ', puzzle.matrix);

    return (
        <div className={`puzzle-container ${puzzle.winState ? 'victory' : ''} ${puzzle.failState ? 'failure' : ''}`}>
          
          <div className="puzzle-grid">
            {this.buildPuzzle(puzzle)}
          </div>

          <PuzzleSubmission
            checkSolutionFunction={puzzle.failState ? () => {} : checkSolutionFunction}
            puzzle={puzzle}
            timerData={timerData}
          />

        </div>
    );
  }
}

const ConnectedPuzzleBoard = connect(
  state => state,
  dispatchMappedActions
)(PuzzleBoard);

export default ConnectedPuzzleBoard;