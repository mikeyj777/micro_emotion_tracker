import React from 'react';
import '../styles/Button.css';

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