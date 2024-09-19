import React from 'react';
import PropTypes from 'prop-types';
import { BarChart as BarChartIcon, Activity, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/GridTest.css';

function generateSampleData() {
  const today = new Date();
  return {
    totalEmotions: Math.floor(Math.random() * 200) + 50,
    positiveRatio: (Math.random() * 40 + 60).toFixed(1),
    daysTracked: Math.floor(Math.random() * 30) + 1,
    emotionTrend: Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - i));
      return {
        date: date.toISOString().split('T')[0],
        positiveCount: Math.floor(Math.random() * 10),
        negativeCount: Math.floor(Math.random() * 10)
      };
    })
  };
}

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="stat-card">
    <div>
      <h3 className="stat-title">{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
    <Icon className="stat-icon" />
  </div>
);

function GridTest({ getData = generateSampleData }) {
  const data = getData();

  return (
    <div className="grid-container">
      <div className="stats-row">
        <StatCard title="Total Emotions Tracked" value={data.totalEmotions} icon={BarChartIcon} />
        <StatCard title="Positive Emotion Ratio" value={`${data.positiveRatio}%`} icon={Activity} />
        <StatCard title="Days Tracked" value={data.daysTracked} icon={Users} />
      </div>
      <div className="chart-container">
        <h3 className="chart-title">Emotion Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.emotionTrend}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="positiveCount" name="Positive" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="negativeCount" name="Negative" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

GridTest.propTypes = {
  getData: PropTypes.func
};

export default GridTest;