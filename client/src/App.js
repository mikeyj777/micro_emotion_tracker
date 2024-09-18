// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import MainDashboard from './components/MainDashboard';
import TrackNewDay from './components/TrackNewDay';
import PositiveEmotions from './components/PositiveEmotions';
import NegativeEmotions from './components/NegativeEmotions';
import Needs from './components/Needs';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={MainDashboard} />
        <Route path="/track-new-day" component={TrackNewDay} />
        <Route path="/positive-emotions" component={PositiveEmotions} />
        <Route path="/negative-emotions" component={NegativeEmotions} />
        <Route path="/needs" component={Needs} />
      </Switch>
    </Router>
  );
}

export default App;