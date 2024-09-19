import React from 'react';
import '../styles/CommonStyles.css';

function Button({ children, onClick, isSelected }) {
  return (
    <button
      className={`button button-emotion-need ${isSelected ? 'button-selected' : 'button-primary'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;