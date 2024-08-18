import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router className="App">
      <Navbar />
    </Router>
  );
}

export default App;
