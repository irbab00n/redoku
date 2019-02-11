import React from 'react';

import PuzzleBoard from './PuzzleBoard';
import PuzzleSummary from './PuzzleSummary';
import PuzzleTimer from './PuzzleTimer';

const widgetCache = {
  'summary': ({ difficulty, puzzleId }) => (
    <PuzzleSummary key={`${difficulty}-${puzzleId}`} difficulty={difficulty} puzzleId={puzzleId}/>
  ),
  'timer': ({ puzzleId }) => (
    <PuzzleTimer key={`timer-${puzzleId}`}/>
  )
};

export default class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    this.buildSideTrackBody = this.buildSideTrackBody.bind(this);
  }

  buildSideTrackBody(widgets) {
    return widgets.map(widget => {
      let widgetContstructor = widgetCache[widget.tag];
      return widgetContstructor(widget.data);
    });
  }

  render() {

    const {
      leftTrackConfig = {},
      rightTrackConfig = {},
      loaded,
      puzzle,
      checkSolutionFunction,
      updateFunction
    } = this.props;

    return (

      <div className="puzzle-layout-wrapper">

        <div className={`left-track ${puzzle.winState ? 'pyro' : ''}`}>
          <div className="before"/>
          <div className="after"/>
          <div className="inner-wrapper">
            {
              this.buildSideTrackBody(leftTrackConfig.widgets || [])
            }
          </div>
        </div> 
        {
          loaded ?
            <PuzzleBoard
              checkSolutionFunction={checkSolutionFunction}
              puzzle={puzzle}
              updateFunction={updateFunction}
            /> :
            null
        }
        <div className="right-track">
          <div className="inner-wrapper">
            {
              this.buildSideTrackBody(rightTrackConfig.widgets || [])
            }
          </div>
        </div>

      </div>
    );
  }
};