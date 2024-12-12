import React, { useState } from 'react';
import Header from './components/Header';
import DrawOptions from './components/DrawOptions';
import WheelDraw from './components/WheelDraw';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MultiRaffle from './components/MultiRaffle';

function App() {
  const [showWheelDraw, setShowWheelDraw] = useState(false);

  const handleShowWheelDraw = () => {
    setShowWheelDraw(true);
  };

  const handleBackFromWheel = () => {
    setShowWheelDraw(false);
  };

  const AnaSayfa = () => (
    <div>
      {!showWheelDraw && (
        <div>
          <DrawOptions handleWheelClick={handleShowWheelDraw} />
        </div>
      )}
      {showWheelDraw && <WheelDraw onBack={handleBackFromWheel} />}
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/multi" element={<MultiRaffle />} />
          <Route path="/" element={<AnaSayfa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
