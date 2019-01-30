import React from 'react';
import PropTypes from 'prop-types';

import LogoTitle from './LogoTitle';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { logoURL, title } = this.props;

    return (

      <header className="navbar-wrapper">
        <div className="navbar-inner-wrapper">
          <LogoTitle 
            logoURL={logoURL}
            title={title}
          />
          <ul className="links">
            <li>
              <a>Links</a>
            </li>
          </ul>
        </div>
      </header>

    );

  }
}

Navbar.propTypes = {
  logoURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}