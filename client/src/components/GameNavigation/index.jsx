import React from 'react';

import DifficultyDropdown from './DifficultyDropdown';

export default class GameNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {

    return (

      <section id="game-navigation">
        {/* QUICKPLAY BUTTON */}
        <button className="quickplay" onClick={() => console.log('Quickplay button pressed')}>
          <span tabIndex="0">Quickplay</span>
        </button>

        <DifficultyDropdown />

        <div>Rules Button</div>
      </section>

    );

  }
}