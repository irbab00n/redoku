import React from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import dispatchMappedActions from '../redux/dispatchMappedActions';

import Footer from '../components/Footer/'
import GameNavigation from '../components/GameNavigation/';
import PuzzleBoard from '../components/Sudoku/PuzzleBoard';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzleLoaded: false
    }
  }

  componentWillMount() {
    this.props.actions.fetchMainViewPuzzle();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { puzzle } = nextProps.views.main;
    const { puzzleLoaded } = nextState;
    let updatedState = {};

    if (puzzle.fetched && !puzzle.fetching && !puzzleLoaded) {
      updatedState.puzzleLoaded = true;
    }

    if (Object.keys(updatedState).length > 0) {
      this.setState(updatedState);
    }

    return true;
  }

  render() {
    const { puzzleLoaded } = this.state;
    console.log('props on main view: ', this.props);

    return (
      <main className="main-view-layout">

        <Helmet>
          <title>{'Redoku | Main'}</title>
        </Helmet>
    
        <GameNavigation
          quickplayClickHandler={this.props.actions.fetchMainViewPuzzle}
        />
        
        <div className="main-view-container">
          {
            puzzleLoaded ?
              <PuzzleBoard
                puzzle={this.props.views.main.puzzle}
              /> :
              null
          }
        </div>
    
        <Footer />
        
      </main>
    );
  }
}

const ConnectedMain = connect(
  state => state,
  dispatchMappedActions
)(Main);

export default ConnectedMain;