// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import Complete from './components/Complete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </Router>
  );
}

export default App;
