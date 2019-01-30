import React from 'react';
import PropTypes from 'prop-types';

import LogoTitle from './LogoTitle';
import NavLinkList from './NavLinkList';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { links = [], logoURL, title } = this.props;

    return (

      <header className="navbar-wrapper">
        <div className="navbar-inner-wrapper">
          <LogoTitle 
            logoURL={logoURL}
            title={title}
          />
          <NavLinkList 
            links={links}
          />
        </div>
      </header>

    );

  }
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
  logoURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}