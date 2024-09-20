import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { csvParse } from 'd3-dsv';
import axios from 'axios';
import Button from './Button';
import { API_BASE_URL } from '../config';
import needsData from '../data/needs.csv';

function Needs() {
  const navigate = useNavigate();
  const [selectedNeeds, setSelectedNeeds] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [needs, setNeeds] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(needsData);
        const csvData = await response.text();
        const parsedData = csvParse(csvData);
        setHeaders(parsedData.columns);
        setNeeds(parsedData);
      } catch (error) {
        console.error('Error fetching CSV data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNeedSelect = (need) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter((n) => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/needs/${userId}`, {
        needs: selectedNeeds,
      });
      navigate('/track-new-day');
    } catch (error) {
      console.error('Error submitting needs:', error);
    }
  };

  const handleSkip = () => {
    navigate('/track-new-day');
  };

  const handleBack = () => {
    navigate('/track-new-day');
  };

  return (
    <div className="gradient-layout">
      <div className="gradient-layout-content">
        <div className="emotions-header">
          <h1 className="gradient-layout-title">Mindful Moments</h1>
          <h2 className="gradient-layout-subtitle">Needs</h2>
          <p className="subtitle">Select any Needs that you're Currently Resonating with</p>
        </div>
        
        <div className="emotions-container">
          {headers.map((header, index) => (
            <div className="emotion-column" key={index}>
              <h3>{header}</h3>
              <div className="button-container">
                {needs.map((row, rowIndex) => {
                  const need = row[header];
                  if (need && need.trim() !== '') {
                    return (
                      <Button
                        key={rowIndex}
                        onClick={() => handleNeedSelect(need)}
                        isSelected={selectedNeeds.includes(need)}
                        className="button-emotion-need"
                      >
                        {need}
                      </Button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="navigation-buttons">
          <button className="button button-primary" onClick={handleSubmit}>Submit</button>
          <button className="button button-secondary" onClick={handleSkip}>Skip</button>
          <button className="button button-secondary" onClick={handleBack}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default Needs;