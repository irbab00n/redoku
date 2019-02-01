import React from 'react';
import { connect } from 'react-redux';
import dispatchMappedActions from '../../redux/dispatchMappedActions';

class PuzzleSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      placeholder: ''
    };
    this.updateValue = this.updateValue.bind(this);
    this.updatePlaceholder = this.updatePlaceholder.bind(this);
    this.replaceValueWithPlaceholder = this.replaceValueWithPlaceholder.bind(this);
  }

  updateValue(keyCode) {
    if (keyCode === 8) {
      this.setState({
        value: '',
        placeholder: ''
      }, () => {});
      // }, () => this.props.actions.updatePuzzleSquare(this.props.coordinates, this.state.value));
    }
    let keyValue = String.fromCharCode(keyCode);
    let values = '123456789';
    if (values.includes(keyValue)) {
      this.setState({
        value: keyValue,
        placeholder: ''
      }, () => {});
      // }, () => this.props.actions.updatePuzzleSquare(this.props.coordinates, this.state.value));
    }
  }
  /* updatePlaceholder info --
    Params
      value     <string>: value to place in the placeholder field for the input

    Purpose
      Wanted to allow the user to be able to change the value without having to click, 
      hit backspace, and then enter a new number.  Plus, if that happened, 
  */
  updatePlaceholder(value) {
    let newPlaceholder = value === '' ? '' : value;
    this.setState({
      placeholder: newPlaceholder,
      value: ''
    });
  }

  /* replaceValueWithPlaceholder info --
    Params
      None

    Purpose
      Check if the current state of the placeholder isn't an empty string
      if it is not, then set the value to the placeholder
      clear the placeholder
  */
  replaceValueWithPlaceholder() {
    if (this.state.placeholder !== '') {
      this.setState({
        value: this.state.placeholder,
        placeholder: ''
      });
    }
  }

  render() {

    let coordinates = this.props.coordinates.split('-');
    let row = coordinates[0];
    let column = coordinates[1];

    return (
      <div className="grid-item display-flex-row flex-align-center flex-justify-center">
        <input 
          className={`puzzle-box ${this.props.background}`} 
          placeholder={this.state.placeholder} 
          value={this.state.value} 
          onKeyDown={(e) => {this.updateValue(e.keyCode)}}
          onFocus={() => this.updatePlaceholder(this.state.value)} 
          onBlur={() => this.replaceValueWithPlaceholder()}
        />
      </div>
    );
  }
}


const ConnectedPuzzleSquare = connect(
  state => state,
  dispatchMappedActions
)(PuzzleSquare);

export default ConnectedPuzzleSquare;