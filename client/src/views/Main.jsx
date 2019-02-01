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
  }

  componentWillMount() {
    this.props.actions.fetchMainViewPuzzle();
  }

  render() {

    return (
      <main className="main-view-layout">

        <Helmet>
          <title>{'Redoku | Main'}</title>
        </Helmet>
    
        <GameNavigation />
        
        <div className="main-view-container">
          <PuzzleBoard />
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