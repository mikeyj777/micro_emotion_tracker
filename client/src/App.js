// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MainDashboard from './components/MainDashboard';
import TrackNewDay from './components/TrackNewDay';
import PositiveEmotions from './components/PositiveEmotions';
import NegativeEmotions from './components/NegativeEmotions';
import Needs from './components/Needs';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:userId" element={<MainDashboard />} />
        <Route path="/track-new-day" element={<TrackNewDay />} />
        <Route path="/positive-emotions" element={<PositiveEmotions />} />
        <Route path="/negative-emotions" element={<NegativeEmotions />} />
        <Route path="/needs" element={<Needs />} />
      </Routes>
    </Router>
  );
}

export default App;