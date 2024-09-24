import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import '../styles/CommonStyles.css';

function TrackNewDay() {
  const navigate = useNavigate();
  const [hasExistingData, setHasExistingData] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const checkExistingData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/check-existing-data/${userId}`);
        setHasExistingData(res.data.hasExistingData);
      } catch (error) {
        console.error('Error checking existing data:', error);
      }
    };

    checkExistingData();
  }, [userId]);

  const handleFeelings = () => {
    navigate('/positive-emotions');
  };

  const handleNeeds = () => {
    navigate('/needs');
  };

  const handleHome = () => {
    const userId = localStorage.getItem('userId');
    navigate(`/dashboard/${userId}`);
  };


  return (
    <div className="gradient-layout">
        <div className="gradient-layout-content">
          <h1 className="gradient-layout-title">Mindful Moments</h1>
          <p className="gradient-layout-subtitle">Select your path</p>
          {hasExistingData && (
            <div className="warning">
              Warning: There is existing data for today. Any new data logged will overwrite the existing data.
            </div>
          )}
          <div className="button-container">
            <button onClick={handleFeelings} className="button button-primary">First thing, let's check in on feelings</button>
            <button onClick={handleNeeds} className="button button-next">Next, let's check on needs</button>
            <button onClick={handleHome} className="button button-next">When we're done checking in, click here see your updated dashboard</button>
          </div>
        </div>
      
      
    </div>
  );
}

export default TrackNewDay;