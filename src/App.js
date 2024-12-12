import React, { useState } from 'react';
import Header from './components/Header';
import DrawOptions from './components/DrawOptions';
import WheelDraw from './components/WheelDraw';
import './App.css';

function App() {
  const [showWheelDraw, setShowWheelDraw] = useState(false);

  const handleShowWheelDraw = () => {
    setShowWheelDraw(true);
  };

  return (
    <div className="App">
      <Header />
      {!showWheelDraw && (
        <DrawOptions handleWheelClick={handleShowWheelDraw} />
      )}
      {showWheelDraw && <WheelDraw />}
    </div>
  );
}

export default App;
