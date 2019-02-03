import React from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import dispatchMappedActions from '../redux/dispatchMappedActions';

import Footer from '../components/Footer/'
import GameNavigation from '../components/GameNavigation/';
import Puzzle from '../components/Sudoku/Puzzle';

import difficultySettings from '../lib/difficultySettings';

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
    const { puzzle } = this.props.views.main;

    const leftTrackConfig = {
      show: true,
      widgets: [
        {
          tag: 'summary',
          data: {
            puzzleId: puzzle.storage.id,
            difficulty: puzzle.storage.difficulty
          }
        },
        {
          tag: 'timer',
          data: {}
        }
      ]
    };

    return (
      <main className="main-view-layout">

        <Helmet>
          <title>{'Redoku | Main'}</title>
        </Helmet>
    
        <GameNavigation
          difficultySettings={difficultySettings}
          puzzleFetcher={this.props.actions.fetchMainViewPuzzle}
        />
        
        <div className="main-view-container">
          <Puzzle
            leftTrackConfig={leftTrackConfig}
            puzzle={puzzle}
            loaded={puzzleLoaded}
            updateFunction={this.props.actions.setMainViewPuzzleSquare}
          /> 
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