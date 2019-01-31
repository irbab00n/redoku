import React from 'react';
import { Helmet } from "react-helmet";

import Footer from '../components/Footer/'
import GameNavigation from '../components/GameNavigation/';
import PuzzleBoard from '../components/Sudoku/PuzzleBoard';


const Home = (props) => (
  <main className="main-view-layout">

    <Helmet>
      <title>{'Redoku | Home'}</title>
    </Helmet>

    <GameNavigation />
    
    <div className="main-view-container">
      <PuzzleBoard />
    </div>

    <Footer />
    
  </main>
);

export default Home;