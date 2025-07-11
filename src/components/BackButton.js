import React from 'react';
import './BackButton.css';

function BackButton({ onClick }) {
  return (
    <button className="back-btn" onClick={onClick} aria-label="Go Back">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#09278a" />
        <path d="M18 10L12 16L18 22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default BackButton;
