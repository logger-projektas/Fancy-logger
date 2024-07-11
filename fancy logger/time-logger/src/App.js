import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobTips from './components/jobtips/JobTips';
import Home from './components/home/Home';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/darbo-tipas" element={<JobTips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
