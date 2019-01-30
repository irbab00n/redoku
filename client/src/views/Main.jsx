import React from 'react';
import { Helmet } from "react-helmet";

import Footer from '../components/Footer/';

const Home = (props) => (
  <main className="main-page-layout">

    <Helmet>
      <title>{'Redoku | Home'}</title>
    </Helmet>

    <Footer />
    
  </main>
);

export default Home;