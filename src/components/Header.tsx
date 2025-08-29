import React from 'react';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  return (
    <div className="header-container">
      <img src={logo} alt="FindOnMap Logo" className="header-logo" />
      <span className="header-name">FindOnMap</span>
    </div>
  );
};

export default Header;
