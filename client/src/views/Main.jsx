import React from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import dispatchMappedActions from '../redux/dispatchMappedActions';

import Footer from '../components/Footer/'
import GameNavigation from '../components/GameNavigation/';
import PuzzleBoard from '../components/Sudoku/PuzzleBoard';
import PuzzleSummary from '../components/Sudoku/PuzzleSummary';
import PuzzleTimer from '../components/Sudoku/PuzzleTimer';

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
          <div className="puzzle-layout-wrapper">

            <div className="left-track">
              <div className="inner-wrapper">

                {/* PUZZLE SUMMARY */}
                <PuzzleSummary
                  difficulty={puzzle.storage.difficulty} 
                  puzzleId={puzzle.storage.id}
                />

                {/* PUZZLE TIMER */}
                <PuzzleTimer />

              </div>
            </div>
            
            {
              puzzleLoaded ?
                <PuzzleBoard
                  puzzle={puzzle}
                  updateFunction={this.props.actions.setMainViewPuzzleSquare}
                /> :
                null
            }
            {/* <div className="right-track">
              <div className="inner-wrapper">
              </div>
            </div> */}
          </div>
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