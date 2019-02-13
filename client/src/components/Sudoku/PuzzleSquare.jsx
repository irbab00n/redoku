import React from 'react';
import { connect } from 'react-redux';
import dispatchMappedActions from '../../redux/dispatchMappedActions';

class PuzzleSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      showValue: true
    };
    this.updateValue = this.updateValue.bind(this);
    this.updatePlaceholder = this.updatePlaceholder.bind(this);
    this.replaceValueWithPlaceholder = this.replaceValueWithPlaceholder.bind(this);
  }

  shouldComponentUpdate(nextState) {
    return true;
  }

  updateValue(keyCode) {
    const { coordinates, updateFunction } = this.props;

    // valid values to allow
    const validCharacters = '123456789';
    // if the user presses the 'Backspace' key
    if (keyCode === 8) {
      this.setState({
        showValue: true,
        placeholder: ''
      }, () => updateFunction(coordinates, ''));
      // }, () => this.props.actions.updatePuzzleSquare(this.props.coordinates, this.state.value));
    }
    // get the character from the keycodes
    let userInput = String.fromCharCode(keyCode);

    // if the input value is in the 
    if (validCharacters.includes(userInput)) {
      this.setState({
        showValue: true,
        placeholder: ''
      }, () => updateFunction(coordinates, userInput))
      // }, () => this.props.actions.updatePuzzleSquare(this.props.coordinates, this.state.value));
    }
  }

  // TO BE RAN ON FOCUS
  updatePlaceholder(value) {
    const { timerData } = this.props;
    // if the timer isn't active and it hasn't been started
    if (!timerData.timer.active && !timerData.started) {
      timerData.timer.start();
    }
    // if the timer isn't active and it has been started
    if (!timerData.timer.active && timerData.started) {
      timerData.timer.resume();
    }

    let newPlaceholder = value === '' ? '' : value;
    this.setState({
      placeholder: newPlaceholder,
      showValue: false
    });
  }

  replaceValueWithPlaceholder() {
    console.log('should run on blur');
    if (this.state.placeholder !== '') {
      this.setState({
        showValue: true,
        placeholder: ''
      });
    }
  }

  render() {
    const { showValue } = this.state;
    const { background, isInitialValue, value } = this.props;

    let coordinates = this.props.coordinates.split('-');
    let row = coordinates[0];
    let column = coordinates[1];

    return (
      <div className={`grid-item display-flex-row flex-align-center flex-justify-center`}>
        <input 
          className={`puzzle-box ${isInitialValue ? `${background} initial-bg` : background}`} 
          placeholder={this.state.placeholder} 
          value={showValue ? value : ''}
          readOnly={isInitialValue}
          onChange={() => {}}
          onKeyDown={isInitialValue ? () => {} : (e) => this.updateValue(e.keyCode)}
          onFocus={isInitialValue ? () => {} : () => this.updatePlaceholder(value)} 
          onBlur={isInitialValue ? () => {} :() => this.replaceValueWithPlaceholder()}
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