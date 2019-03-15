import React from 'react';
import { connect } from 'react-redux';
import dispatchMappedActions from '../../redux/dispatchMappedActions';

class PuzzleSquare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      mouseEnteredPad: false,
      showNumberPad: false,
      showValue: true
    };
    this.buildNumbers = this.buildNumbers.bind(this);
    this.setMouseEnteredPad = this.setMouseEnteredPad.bind(this);
    this.replaceValueWithPlaceholder = this.replaceValueWithPlaceholder.bind(this);
    this.toggleNumberPad = this.toggleNumberPad.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updatePlaceholder = this.updatePlaceholder.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { started } = nextProps.timerData;

    /* 
      Ensures the showValue state will reset when the timer resets
      Before this was added, if the user clicked into a square starting the timer,
      the Redux state causes the component to not reset the showValue flag
    */
    if (!started && this.props.timerData.started) {
      this.setState({
        showValue: true
      });
    }

    return true;
  }

  buildNumbers(numbers) {
    return numbers.map(number => (
      <li
        key={`numberpad-number-${number}`}
        className={number === 'Clear' ? 'clear' : ''}
        onClick={() => this.updateValue(number === 'Clear' ? 8 : number.toString().charCodeAt(0))}
      >
        {number}
      </li>
    ));
  }

  setMouseEnteredPad(state) {
    this.setState({
      mouseEnteredPad: state
    });
  }
  
  replaceValueWithPlaceholder() {
    // console.log('should run on blur');
    if (this.state.placeholder !== '') {
      this.setState({
        showValue: true,
        placeholder: ''
      });
    }
  }

  toggleNumberPad() {
    this.setState({
      showNumberPad: !this.state.showNumberPad
    });
  }

  updateValue(keyCode) {
    const { coordinates, updateFunction } = this.props;

    console.log('keycode to update: ', keyCode);

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

  render() {
    const { mouseEnteredPad, showNumberPad, showValue } = this.state;
    const { background, isInitialValue, value } = this.props;

    let coordinates = this.props.coordinates.split('-');
    let row = coordinates[0];
    let column = coordinates[1];
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Clear'];

    return (
      <div className={`grid-item`}>
        {
          showNumberPad || mouseEnteredPad ?
            <ul className="puzzle-number-pad"
              onMouseEnter={() => this.setMouseEnteredPad(true)}
              onMouseLeave={() => this.setMouseEnteredPad(false)}
            >
              {
                this.buildNumbers(numbers)
              }
            </ul> :
            null
        }
        <input 
          className={`puzzle-box ${isInitialValue ? `${background} initial-bg` : background}`} 
          placeholder={this.state.placeholder} 
          value={showValue ? value : ''}
          readOnly={isInitialValue}
          onChange={() => {}}
          onKeyDown={isInitialValue ? () => {} : (e) => this.updateValue(e.keyCode)}
          onFocus={isInitialValue ? () => {} : () => {
            this.toggleNumberPad();
            this.updatePlaceholder(value);
          }} 
          onBlur={isInitialValue ? () => {} : () => {
            this.toggleNumberPad();
            this.replaceValueWithPlaceholder();
          }}
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