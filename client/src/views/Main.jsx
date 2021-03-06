import React from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import dispatchMappedActions from '../redux/dispatchMappedActions';

import Footer from '../components/Footer/'
import GameNavigation from '../components/GameNavigation/';
import Puzzle from '../components/Sudoku/Puzzle';
import PuzzleLoading from '../components/Sudoku/PuzzleLoading';

import difficultySettings from '../lib/difficultySettings';
import Timer from '../lib/classes/Timer';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzleLoaded: false
    }
  }

  componentWillMount() {
    const timerConfig = {
      onTick: () => {
        // console.log('main timer tick');
        this.props.actions.incrementMainViewTimer();
      },
      onStart: (id) => {
        console.log('starting the main timer: ', id);
        this.props.actions.setMainViewTimerActive(true);
        this.props.actions.setMainViewTimerStarted(true);
      },
      onPause: (remaining) => {
        console.log('pausing the main timer: ', remaining);
        this.props.actions.setMainViewTimerActive(false);
      },
      onResume: (remaining) => {
        console.log('resuming the main timer: ', remaining);
        this.props.actions.setMainViewTimerActive(true);
      }
    };
    const timer = new Timer(1000, timerConfig);
    this.props.actions.fetchMainViewPuzzle();
    this.props.actions.setMainViewTimer(timer);
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
    const { puzzle, timerData } = this.props.views.main;

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
          data: {
            puzzle,
            showControls: false,
            timerData
          }
        }
      ]
    };

    const rightTrackConfig = {
      show: true,
      widgets: [
        // {
        //   tag: 'analytics',
        //   data: {
        //   }
        // }
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
          {
            puzzle.fetching ?
              <PuzzleLoading /> :
              <Puzzle
                leftTrackConfig={leftTrackConfig}
                rightTrackConfig={rightTrackConfig}
                puzzle={puzzle}
                loaded={puzzleLoaded}
                checkSolutionFunction={this.props.actions.checkMainViewPuzzleSolution}
                updateFunction={this.props.actions.setMainViewPuzzleSquare}
                timerData={timerData}
              /> 
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