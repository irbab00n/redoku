import React from 'react';

import PuzzleBoard from './PuzzleBoard';
import PuzzleSummary from './PuzzleSummary';
import PuzzleTimer from './PuzzleTimer';

const widgetCache = {
  'summary': ({ difficulty, puzzleId }) => (
    <PuzzleSummary difficulty={difficulty} puzzleId={puzzleId}/>
  ),
  'timer': () => (
    <PuzzleTimer />
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
      updateFunction
    } = this.props;

    return (

      <div className="puzzle-layout-wrapper">

        <div className="left-track">
          <div className="inner-wrapper">
            {
              this.buildSideTrackBody(leftTrackConfig.widgets || [])
            }
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
            {
              this.buildSideTrackBody(rightTrackConfig.widgets || [])
            }
          </div>
        </div>

      </div>
    );
  }
};