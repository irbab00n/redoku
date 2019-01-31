import React from 'react';
import PuzzleSquare from './PuzzleSquare';

export default class PuzzleBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.buildPuzzle = this.buildPuzzle.bind(this);
    this.determineBackground = this.determineBackground.bind(this);
  }

  determineBackground(row, column) {
    let alternates = '345';
    let rowCheck = alternates.includes(row);
    let columnCheck = alternates.includes(column);
    if (rowCheck && columnCheck) {
      return 'grid-bg-normal';
    }
    if (rowCheck || columnCheck) {
      return 'grid-bg-alt';
    }
    return 'grid-bg-normal';
  }
  
  buildPuzzle() {
    let size = 8;
    let row = 0;
    let column = 0;
    let elements = [];
    while (true) {
      let connectedElement = (
        <PuzzleSquare 
          key={`${row}${column}`} 
          coordinates={`${row}-${column}`} 
          background={this.determineBackground(row, column)}
        />
      );
      elements.push(connectedElement);
      if (column === size && row === size) {
        break;
      }
      column === size ? (column = 0, row++): column++;
    }
    console.log('elements: ', elements);
    return elements;
  }

  render() {

    console.log(this.props);

    return (

        <div className="puzzle-container">
          <div className="puzzle-grid">
            {this.buildPuzzle()}
          </div>

          <div className="puzzle-options display-flex-row flex-align-center flex-justify-around">
            <button onClick={() => this.props.actions.checkPuzzleSolution()}>Submit Puzzle</button>
            <button onClick={() => this.props.actions.checkPuzzleSolution()}>Submit Puzzle</button>
          </div>
        </div>

    );

  }
}