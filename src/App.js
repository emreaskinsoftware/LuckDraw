// Main Application File (App.js)

import React, { useState } from 'react';
import Header from './components/Header';
import DrawOptions from './components/DrawOptions';
import WheelDraw from './components/WheelDraw';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MultiRaffle from './components/MultiRaffle';

function App() {
  // State for controlling the visibility of the Wheel Draw screen
  const [showWheelDraw, setShowWheelDraw] = useState(false);

  // Handler for showing the Wheel Draw screen
  const handleShowWheelDraw = () => {
    setShowWheelDraw(true);
  };

  // Handler for navigating back from the Wheel Draw screen
  const handleBackFromWheel = () => {
    setShowWheelDraw(false);
  };

  // Home Page Component
  const HomePage = () => (
    <div>
      {!showWheelDraw && (
        <div>
          {/* Options for selecting the draw method */}
          <DrawOptions handleWheelClick={handleShowWheelDraw} />
        </div>
      )}
      {showWheelDraw && <WheelDraw onBack={handleBackFromWheel} />}
    </div>
  );

  return (
    <Router>
      <div className="App">
        {/* Application Header */}
        <Header />

        {/* Define Routes for Navigation */}
        <Routes>
          <Route path="/multi" element={<MultiRaffle />} />  {/* Multi Raffle Screen */}
          <Route path="/" element={<HomePage />} />          {/* Home Screen */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
