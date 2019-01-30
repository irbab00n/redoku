import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const logoURL = 'https://s3-us-west-1.amazonaws.com/cos-bytes.com/react_512x512.png';

    return (

      <header className="navbar-wrapper">
        <div className="navbar-inner-wrapper">
          <div className="logo"><img src={logoURL} /><a href="/">React Starter</a></div>
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

export default Navbar;