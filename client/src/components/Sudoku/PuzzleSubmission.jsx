import React from 'react';

const PuzzleSubmission = ({ checkSolutionFunction, puzzle }) => (
  <div className="puzzle-submission-wrapper">
    <div className="inner-wrapper">
      <button
        className="puzzle-submission"
        onClick={() => checkSolutionFunction(JSON.parse(JSON.stringify(puzzle.matrix)))}
      >
        Submit Puzzle
      </button>
    </div>
  </div>
);

export default PuzzleSubmission;