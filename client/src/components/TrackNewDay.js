import React from 'react';
import { useNavigate } from 'react-router-dom';

function TrackNewDay() {
  const navigate = useNavigate();

  const handleFeelings = () => {
    navigate('/positive-emotions');
  };

  const handleNeeds = () => {
    navigate('/needs');
  };

  const handleHome = () => {
    const userId = localStorage.getItem('userId');
    navigate(`/dashboard/${userId}`);
  };


  return (
    <div>
      <button onClick={handleFeelings}>Log Feelings</button>
      <button onClick={handleNeeds}>Log Needs</button>
      <button onClick={handleHome}>Go Home</button>
    </div>
  );
}

export default TrackNewDay;