import React from 'react';
import PropTypes from 'prop-types';

const NavLink = ({ endpoint, title }) => (
  <li>
    <a href={endpoint}>{title}</a>
  </li>
);

NavLink.propTypes = {
  endpoint: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default NavLink;