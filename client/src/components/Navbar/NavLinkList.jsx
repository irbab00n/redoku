import React from 'react';
import PropTypes from 'prop-types';

import NavLink from './NavLink';

const NavLinkList = ({ links }) => (
  <nav>
    <ul>
      {
        links.map((link, index) => (
          <NavLink key={`nav-link-${index}`} endpoint={link.endpoint} title={link.title} />
        )) 
      }
    </ul>
  </nav>
);

NavLinkList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default NavLinkList;