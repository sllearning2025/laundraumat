import React from 'react';
import './OwnerRegisterButton.css';

function OwnerRegisterButton({ onClick }) {
  return (
    <button className="registration-type-btn owner-btn" onClick={onClick}>
      Register as Laundramat Owner
    </button>
  );
}

export default OwnerRegisterButton;
