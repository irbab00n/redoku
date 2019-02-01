import React from 'react';
import { connect } from 'react-redux';
import dispatchMappedActions from '../../redux/dispatchMappedActions';

import PuzzleSquare from './PuzzleSquare';

class PuzzleBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.buildPuzzle = this.buildPuzzle.bind(this);
    this.determineBackground = this.determineBackground.bind(this);
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
  buildPuzzle() {
    const sudokuSizeLimit = 8; // Array index representation of a Sudoku puzzle size (9 x 9 squares), 
    let row = 0; // Row counter
    let column = 0; // Column counter
    let elements = []; // Built element storage
    /* 
      Use 'while' loop that terminates with a 'break' statement
      This best suits the needs of assigning the elements
    */
    while (true) {
      // Create a new PuzzleSquare, and assign the coordinates and background
      let assignedElement = (
        <PuzzleSquare 
          key={`${row}${column}`} 
          coordinates={`${row}-${column}`} 
          background={this.determineBackground(row, column)}
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

    return (
        <div className="puzzle-container">
          <div className="puzzle-grid">
            {this.buildPuzzle()}
          </div>

          {/* <div className="puzzle-options display-flex-row flex-align-center flex-justify-around">
            <button onClick={() => this.props.actions.checkPuzzleSolution()}>Submit Puzzle</button>
            <button onClick={() => this.props.actions.checkPuzzleSolution()}>Submit Puzzle</button>
          </div> */}
        </div>
    );
  }
}

const ConnectedPuzzleBoard = connect(
  state => state,
  dispatchMappedActions
)(PuzzleBoard);

export default ConnectedPuzzleBoard;