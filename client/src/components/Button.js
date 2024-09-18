import React from 'react';
import './Button.css';

function Button({ children, onClick, isSelected }) {
  return (
    <button
      className={`custom-button ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;