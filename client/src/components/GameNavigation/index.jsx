import React from 'react';

import DifficultyDropdown from './DifficultyDropdown';

export default class GameNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { quickplayClickHandler = () => {} } = this.props;

    return (

      <section id="game-navigation">
        {/* QUICKPLAY BUTTON */}
        <button className="quickplay" onClick={quickplayClickHandler}>
          <span tabIndex="0">Quickplay</span>
        </button>

        {/* DIFFICULTY DROPDOWN */}
        <DifficultyDropdown />

        {/* RULES TOGGLE */}
        {/* <div>Rules Button</div> */}
      </section>

    );

  }
}