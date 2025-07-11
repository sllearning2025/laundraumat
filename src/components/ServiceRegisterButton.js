import React from 'react';
import './ServiceRegisterButton.css';

function ServiceRegisterButton({ onClick }) {
  return (
    <button className="registration-type-btn service-btn" onClick={onClick}>
      Register for Laundry Services
    </button>
  );
}

export default ServiceRegisterButton;
