// MainDashboard.js
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function MainDashboard() {
  const [emotionData, setEmotionData] = useState([]);
  const [daysToView, setDaysToView] = useState(7);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/emotions?days=${daysToView}`);
        setEmotionData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [daysToView]);

  const handleTrackNewDay = () => {
    history.push('/track-new-day');
  };

  return (
    <div>
      <button onClick={handleTrackNewDay}>Track New Day</button>
      <div>
        <LineChart width={600} height={300} data={emotionData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="positiveCount" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="negativeCount" stroke="#82ca9d" />
        </LineChart>
        <input
          type="number"
          value={daysToView}
          onChange={(e) => setDaysToView(e.target.value)}
        />
      </div>
    </div>
  );
}

export default MainDashboard;