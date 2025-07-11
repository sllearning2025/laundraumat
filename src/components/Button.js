import React from 'react';
import './Button.css';

function Button({ children, onClick, type = 'button' }) {
  return (
    <button className="laundraumat-btn" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
