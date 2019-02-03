import React from 'react';

const PuzzleControls = ({ checkSolutionFunction, puzzle }) => (
  <div className="puzzle-options display-flex-row flex-align-center flex-justify-around">
      <button onClick={() => checkSolutionFunction(JSON.parse(JSON.stringify(puzzle.matrix)))}>Submit Puzzle</button>
    </div>
);

export default PuzzleControls;