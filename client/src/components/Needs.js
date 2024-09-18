// Needs.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function Needs() {
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const history = useHistory();

  const handleNeedSelect = (need) => {
    setSelectedNeeds((prevNeeds) => [...prevNeeds, need]);
  };

  const handleNext = async () => {
    try {
      await axios.post('/api/needs', { needs: selectedNeeds });
      history.push('/track-new-day');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkip = () => {
    history.push('/track-new-day');
  };

  const handleBack = () => {
    history.push('/track-new-day');
  };

  return (
    <div>
      <h2>Needs</h2>
      {/* Render need headers and buttons */}
      <button onClick={handleNext}>Next</button>
      <button onClick={handleSkip}>Skip</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default Needs;