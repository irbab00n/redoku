import React from 'react';

import DotGrid from '../Loading/DotGrid';

class PuzzleLoading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="puzzle-loading-wrapper">
        <DotGrid />
      </div>
    );

  }
}

export default PuzzleLoading;