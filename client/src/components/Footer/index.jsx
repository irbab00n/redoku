import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <footer className="footer-wrapper">
        <div className="footer-inner-wrapper">
          2019 All Rights Reserved | Developed by Thomas Cosby
        </div>
      </footer>
    );

  }
}