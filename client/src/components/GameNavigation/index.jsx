import React from 'react';

import DifficultyDropdown from './DifficultyDropdown';

export default class GameNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { difficultySettings, puzzleFetcher = () => {} } = this.props;

    return (

      <section id="game-navigation">
        {/* DIFFICULTY DROPDOWN */}
        <DifficultyDropdown
          difficultySettings={difficultySettings}
          puzzleFetcher={puzzleFetcher}
        />

        {/* QUICKPLAY BUTTON */}
        <button className="quickplay" onClick={puzzleFetcher}>
          <span tabIndex="0">Quickplay</span>
        </button>

        {/* RULES TOGGLE */}
        {/* <div className="end-container">
          <button className="list-toggle">
            <span tabIndex="0">More Puzzles</span>
          </button>
        </div> */}
        {/* <div>Rules Button</div> */}
      </section>

    );

  }
}