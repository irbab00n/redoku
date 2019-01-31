import React from 'react';

export default class DifficultyDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    };
    this.toggleShowDropdown = this.toggleShowDropdown.bind(this);
  }

  toggleShowDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }

  render() {
    const { showDropdown } = this.state;

    return (

      <div className="difficulty-dropdown" onMouseLeave={() => {
        showDropdown ?
          this.toggleShowDropdown() :
          null
      }}>
        <div className="dropdown-wrapper">
          <div className="selection-arrow-wrapper" onClick={this.toggleShowDropdown}>
            <span className="label">Difficulty</span>
            <i className={`fas fa-angle-down arrow ${showDropdown ? 'show' : ''}`}></i>
          </div>
          <ul className={showDropdown ? 'show' : ''}>
            <li><a>Easy</a></li>
            <li><a>Medium</a></li>
            <li><a>Hard</a></li>
          </ul>
        </div>
      </div>
    );
  }
}