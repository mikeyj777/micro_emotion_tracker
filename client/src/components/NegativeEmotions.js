// NegativeEmotions.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function NegativeEmotions() {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const history = useHistory();

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotions((prevEmotions) => [...prevEmotions, emotion]);
  };

  const handleNext = async () => {
    try {
      await axios.post('/api/emotions', { emotions: selectedEmotions, type: 'negative' });
      history.push('/track-new-day');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkip = () => {
    history.push('/track-new-day');
  };

  const handleBack = () => {
    history.push('/positive-emotions');
  };

  return (
    <div>
      <h2>Negative Emotions</h2>
      {/* Render emotion headers and buttons */}
      <button onClick={handleNext}>Next</button>
      <button onClick={handleSkip}>Skip</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default NegativeEmotions;