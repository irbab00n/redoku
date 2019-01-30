import React from 'react';
import PropTypes from 'prop-types';

const LogoTitle = ({ logoURL, title }) => (
  <div className="logo"><img src={logoURL} /><a href="/">{title}</a></div>
);

LogoTitle.propTypes = {
  logoURL: PropTypes.string,
  title: PropTypes.string
};

LogoTitle.defaultProps = {
  logoURL: 'https://s3-us-west-1.amazonaws.com/cos-bytes.com/react_512x512.png',
  title: 'Placeholder Title'
};

export default LogoTitle;