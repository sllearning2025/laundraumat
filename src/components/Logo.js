import React from 'react';
import './Logo.css';

function Logo() {
  return (
    <img src={process.env.PUBLIC_URL + '/laundry.png'} alt="Laundry Logo" className="logo" />
  );
}

export default Logo;
