import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function NegativeEmotions() {
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotions((prevEmotions) => [...prevEmotions, emotion]);
  };

  const handleNext = async () => {
    try {
      await axios.post(`/api/emotions/${userId}`, { emotions: selectedEmotions, type: 'negative' });
      navigate('/track-new-day');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkip = () => {
    navigate('/track-new-day');
  };

  const handleBack = () => {
    navigate('/positive-emotions');
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