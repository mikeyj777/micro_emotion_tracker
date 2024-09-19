import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { csvParse } from 'd3-dsv';
import feelingsData from '../data/feelings_positive.csv';
import axios from 'axios';
import Button from './Button';
import { API_BASE_URL } from '../config';

function PositiveEmotions() {
  const navigate = useNavigate();
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [feelings, setFeelings] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(feelingsData);
        const csvData = await response.text();
        const parsedData = csvParse(csvData);
        setHeaders(parsedData.columns);
        setFeelings(parsedData);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEmotionSelect = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter((e) => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/emotions/${userId}`, {
        emotions: selectedEmotions,
        type: 'positive',
      });
      navigate('/negative-emotions');
    } catch (error) {
      console.error('Error submitting positive emotions:', error);
    }
  };

  const handleSkip = () => {
    navigate('/negative-emotions');
  };

  const handleBack = () => {
    navigate('/track-new-day');
  };

  return (
    <div>
      <h2>Positive Emotions</h2>
      {headers.map((header, index) => (
        <div key={index}>
          <h3>{header}</h3>
          {feelings.map((row, rowIndex) => {
            const emotion = row[header];
            if (emotion && emotion.trim() !== '') {
              return (
                <Button
                  key={rowIndex}
                  onClick={() => handleEmotionSelect(emotion)}
                  isSelected={selectedEmotions.includes(emotion)}
                >
                  {emotion}
                </Button>
              );
            }
            return null;
          })}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleSkip}>Skip</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default PositiveEmotions;