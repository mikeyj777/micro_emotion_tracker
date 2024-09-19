import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function MainDashboard() {
  const [emotionData, setEmotionData] = useState([]);
  const [daysToView, setDaysToView] = useState(7);
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/emotions/${userId}?days=${daysToView}`);
        console.log('fetching res.data: ', res.data);
        setEmotionData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [userId, daysToView]);

  const handleTrackNewDay = () => {
    navigate('/track-new-day');
  };

  return (
    <div>
      {console.log('from return - emotionData: ', emotionData)}
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