import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Registration from './components/Registration';
import VideoPage from './components/VideoPage';
import OneOfUs from './components/OneOfUs';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/linux" element={<VideoPage videoFile="lin.mp4" os="linux" />} />
        <Route path="/windows" element={<VideoPage videoFile="win.mp4" os="windows" />} />
        <Route path="/oneofus" element={<OneOfUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


