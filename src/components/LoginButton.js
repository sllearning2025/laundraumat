import React from 'react';
import './LoginButton.css';

function LoginButton({ onClick }) {
  return (
    <button className="laundraumat-btn login-btn" onClick={onClick}>
      Login
    </button>
  );
}

export default LoginButton;
