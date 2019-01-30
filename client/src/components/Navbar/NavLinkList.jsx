import React from 'react';
import PropTypes from 'prop-types';

const NavLinkList = ({ links }) => (
  <nav>
    <ul>
      {
        links.map(link => (
          <li>
            <a href={link.endpoint}>{link.title}</a>
          </li>
        )) 
      }
    </ul>
  </nav>
);

NavLinkList.propTypes = {
  links: PropTypes.array.isRequired
};

export default NavLinkList;