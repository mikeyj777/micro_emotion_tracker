import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_BASE_URL } from '../config';
import '../styles/CommonStyles.css';

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="stat-card">
    <Icon className="stat-icon" />
    <div>
      <h3 className="stat-title">{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  </div>
);

function MainDashboard() {
  const [emotionData, setEmotionData] = useState([]);
  const [needsData, setNeedsData] = useState([]);
  const [daysToView, setDaysToView] = useState(7);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/emotions/${userId}?days=${daysToView}`);
        setEmotionData(res.data);

      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [userId, daysToView]);

  useEffect(() => {
    const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/needs/${userId}?days=${daysToView}`);
      setNeedsData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();
}, [userId, daysToView]);

  const handleTrackNewDay = () => {
    navigate('/track-new-day');
  };

  const handleReturnToLogin = () => {
    navigate('/');
  };

  const totalEmotions = emotionData.reduce((acc, day) => acc + day.positiveCount + day.negativeCount, 0);
  const positiveRatio = emotionData.length > 0
    ? (emotionData.reduce((acc, day) => acc + day.positiveCount, 0) / totalEmotions * 100).toFixed(1)
    : 0;

  return (
    <div className="gradient-layout">
      <div className="gradient-layout-content">
        <h1 className="gradient-layout-title">Mindful Moments</h1>
        <p className="gradient-layout-subtitle">Your daily path to emotional well-being</p>
        <button onClick={handleTrackNewDay} className="button button-primary">Please Start Your Journey by Clicking Here</button>
      
      <div className="stats-row">
        <StatCard title="Total Emotions" value={totalEmotions} icon={() => <span className="icon">📊</span>} />
        <StatCard title="Positive Ratio" value={`${positiveRatio}%`} icon={() => <span className="icon">🌟</span>} />
        <StatCard title="Days Tracked" value={emotionData.length} icon={() => <span className="icon">📅</span>} />
      </div>
      
      <div className="chart-container">
        <h2 className="chart-title">Emotion Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={emotionData}>
            <XAxis dataKey="date" stroke="#047857" />
            <YAxis stroke="#047857" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip contentStyle={{ backgroundColor: '#f0fdf4', border: '1px solid #047857' }} />
            <Legend />
            <Line type="monotone" dataKey="positiveCount" name="Positive" stroke="#6A65F2" strokeWidth={2} dot={{ fill: '#6A65F2', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="negativeCount" name="Negative" stroke="#E8489C" strokeWidth={2} dot={{ fill: '#E8489C', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">Needs Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={needsData}>
            <XAxis dataKey="date" stroke="#047857" />
            <YAxis stroke="#047857" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip contentStyle={{ backgroundColor: '#f0fdf4', border: '1px solid #047857' }} />
            <Legend />
            <Line type="monotone" dataKey="needs" name="Needs" stroke="#6A65F2" strokeWidth={2} dot={{ fill: '#6A65F2', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="dashboard-controls">
        {/* <button onClick={handleTrackNewDay} className="button button-primary"> */}
        <button onClick={handleReturnToLogin} className="button button-primary">
          Logout
        </button>
        <div className="days-input">
          <span className="days-label">Days to view:</span>
          <input
            type="number"
            value={daysToView}
            onChange={(e) => setDaysToView(e.target.value)}
            className="input-field"
          />
        </div>
      </div>
      </div>
    </div>
  );
}

export default MainDashboard;