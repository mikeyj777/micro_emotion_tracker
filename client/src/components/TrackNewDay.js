// TrackNewDay.js
import React from 'react';
import { useHistory } from 'react-router-dom';

function TrackNewDay() {
  const history = useHistory();

  const handleFeelings = () => {
    history.push('/positive-emotions');
  };

  const handleNeeds = () => {
    history.push('/needs');
  };

  return (
    <div>
      <button onClick={handleFeelings}>Log Feelings</button>
      <button onClick={handleNeeds}>Log Needs</button>
    </div>
  );
}

export default TrackNewDay;