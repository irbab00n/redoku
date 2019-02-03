import React from 'react';

import PuzzleBoard from './PuzzleBoard';
import PuzzleSummary from './PuzzleSummary';
import PuzzleTimer from './PuzzleTimer';

export default class Puzzle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { puzzle, loaded, updateFunction } = this.props;

    return (

      <div className="puzzle-layout-wrapper">

        <div className="left-track">
          <div className="inner-wrapper">

            {/* PUZZLE SUMMARY */}
            <PuzzleSummary
              difficulty={puzzle.storage.difficulty} 
              puzzleId={puzzle.storage.id}
            />

            {/* PUZZLE TIMER */}
            <PuzzleTimer />

          </div>
        </div>
        
        {
          loaded ?
            <PuzzleBoard
              puzzle={puzzle}
              updateFunction={updateFunction}
            /> :
            null
        }
        <div className="right-track">
          <div className="inner-wrapper">
          </div>
        </div>

      </div>
    );
  }
};