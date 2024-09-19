import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function Login() {
  
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name) {
        console.log('Please enter a name');
        return;
      } 
        
      const res = await axios.post(`${API_BASE_URL}/api/users`, { name });
      const userId = res.data.userId;
      localStorage.setItem('userId', userId);
      navigate(`/dashboard/${userId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="gradient-layout">
      <div className="gradient-layout-content">
        <h1 className="gradient-layout-title">Mindful Moments</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="button button-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;