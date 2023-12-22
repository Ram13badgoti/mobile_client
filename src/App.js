// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;