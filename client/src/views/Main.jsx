import React from 'react';
import { Helmet } from "react-helmet";

import GameNavigation from '../components/GameNavigation/'

const Home = (props) => (
  <main className="main-view-layout">

    <Helmet>
      <title>{'Redoku | Home'}</title>
    </Helmet>

    <GameNavigation />

    <div>Main Content</div>
    
  </main>
);

export default Home;