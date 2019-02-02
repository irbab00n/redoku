import React from 'react';

export default class DifficultyDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false
    };
    this.buildDifficultyListItems = this.buildDifficultyListItems.bind(this);
    this.toggleShowDropdown = this.toggleShowDropdown.bind(this);
  }

  buildDifficultyListItems(difficulties) {
    const { puzzleFetcher } = this.props;
    return difficulties.map(setting => (
      <li onClick={() => {
        puzzleFetcher({difficulty: setting.difficulty});
        this.toggleShowDropdown();
      }} key={`difficulty-${setting.title}`}><a>{setting.title}</a></li>
    ));
  }

  toggleShowDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }

  render() {
    const { showDropdown } = this.state;
    const { difficultySettings } = this.props;

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
            {
              showDropdown ?
                this.buildDifficultyListItems(difficultySettings) : 
                null
            }
          </ul>
        </div>
      </div>
    );
  }
}