import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

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
    <div>
      {hasExistingData && (
        <div className="warning">
          Warning: There is existing data for today. Any new data logged will overwrite the existing data.
        </div>
      )}
      <button onClick={handleFeelings}>Log Feelings</button>
      <button onClick={handleNeeds}>Log Needs</button>
      <button onClick={handleHome}>Go Home</button>
    </div>
  );
}

export default TrackNewDay;