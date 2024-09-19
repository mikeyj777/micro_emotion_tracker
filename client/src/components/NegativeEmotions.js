import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { csvParse } from 'd3-dsv';
import axios from 'axios';
import Button from './Button';
import { API_BASE_URL } from '../config';
import feelingsData from '../data/feelings_negative.csv';

function NegativeEmotions() {
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
        type: 'negative',
      });
      navigate('/track-new-day');
    } catch (error) {
      console.error('Error submitting negative emotions:', error);
    }
  };

  const handleSkip = () => {
    navigate('/track-new-day');
  };

  const handleBack = () => {
    navigate('/positive-emotions');
  };

  return (
    <div className="gradient-layout">
      <div className="gradient-layout-content">
        <h1 className="gradient-layout-title">Mindful Moments</h1>
        <h2 className="title">Negative Emotions</h2>
        <p className="subtitle">Select any negative emotions you may be experiencing today</p>
      </div>
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
      <div className="button-group">
        <button className="button button-primary" onClick={handleSubmit}>Submit</button>
        <button className="button button-secondary" onClick={handleSkip}>Skip</button>
        <button className="button button-secondary" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default NegativeEmotions;