import React from 'react';

import Footer from '../components/Footer/';
import Jumbotron from '../components/Jumbotron/';

import slides from '../lib/jumbotronSlides';

const Home = (props) => (
  <main className="main-page-layout">

    {/* Jumbotron */}
    <Jumbotron
      slides={slides}
    />

    <Footer />


  </main>
);

export default Home;