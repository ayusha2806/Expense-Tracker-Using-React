import React from 'react';

import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import SignUp from './components/SignUp';
import Login from './components/Login';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/' element={<SignUp />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
