import React from 'react';
import './RegisterButton.css';

function RegisterButton({ onClick }) {
  return (
    <button className="laundraumat-btn register-btn" onClick={onClick}>
      Register
    </button>
  );
}

export default RegisterButton;
