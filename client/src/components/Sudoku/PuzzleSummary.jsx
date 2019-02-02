import React from 'react';

const PuzzleSummary = ({ difficulty, puzzleId }) => (
  <div className="puzzle-summary-wrapper">
    <h4>{`Puzzle #${puzzleId}`}</h4>
    <div className="puzzle-difficulty-wrapper">Difficulty:<span>{difficulty}</span></div>
  </div>
);

export default PuzzleSummary;