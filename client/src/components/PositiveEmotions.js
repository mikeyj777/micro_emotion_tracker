// PositiveEmotions.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function PositiveEmotions() {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const history = useHistory();

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotions((prevEmotions) => [...prevEmotions, emotion]);
  };

  const handleNext = async () => {
    try {
      await axios.post('/api/emotions', { emotions: selectedEmotions, type: 'positive' });
      history.push('/negative-emotions');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkip = () => {
    history.push('/negative-emotions');
  };

  const handleBack = () => {
    history.push('/track-new-day');
  };

  return (
    <div>
      <h2>Positive Emotions</h2>
      {/* Render emotion headers and buttons */}
      <button onClick={handleNext}>Next</button>
      <button onClick={handleSkip}>Skip</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default PositiveEmotions;