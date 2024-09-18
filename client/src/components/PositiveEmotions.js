import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { csvParse } from 'd3-dsv';
import feelingsData from '../data/feelings_positive.csv';
import Button from './Button';

function PositiveEmotions() {
  const navigate = useNavigate();
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [feelings, setFeelings] = useState([]);

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
    console.log(selectedEmotions);
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter((e) => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleSubmit = async () => {
    try {
      // Perform any necessary actions with the selected emotions
      console.log('Selected Emotions:', selectedEmotions);

      // Navigate to the next page
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
          {feelings.map((row, rowIndex) => (
            <Button
              key={rowIndex}
              onClick={() => handleEmotionSelect(row[header])}
              isSelected={selectedEmotions.includes(row[header])}
            >
              {row[header]}
            </Button>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleSkip}>Skip</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default PositiveEmotions;