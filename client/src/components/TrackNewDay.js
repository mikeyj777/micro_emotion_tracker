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


  return (
    <div>
      <button onClick={handleFeelings}>Log Feelings</button>
      <button onClick={handleNeeds}>Log Needs</button>
    </div>
  );
}

export default TrackNewDay;