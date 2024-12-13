// Importing necessary React features and styles
import React, { useState } from 'react';
import './WheelDraw.css';
import { Wheel } from 'react-custom-roulette';

function WheelDraw({ onBack }) {
  // State management for participants and input values
  const [participants, setParticipants] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [winner, setWinner] = useState('');
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // Create wheel data from participant names
  const data = participants.map((name) => ({ option: name }));

  // Add participant to the list
  const handleAddParticipant = () => {
    if (participants.length >= 12) {
      alert('En fazla 12 kişi ekleyebilirsiniz.'); // Maximum limit alert
      return;
    }
    if (!nameInput.trim()) {
      alert('Lütfen bir isim girin.'); // Input validation alert
      return;
    }
    setParticipants([...participants, nameInput.trim()]);
    setNameInput('');
  };

  // Handle wheel spin
  const handleSpinClick = () => {
    if (participants.length === 0) {
      alert('Çevirmek için önce en az bir isim ekleyin.'); // Ensure there are participants
      return;
    }
    setWinner(''); // Clear previous winner
    const randomIndex = Math.floor(Math.random() * participants.length);
    setPrizeNumber(randomIndex); // Set random winner
    setMustSpin(true); // Start spinning
  };

  // Triggered when wheel stops spinning
  const onStopSpinning = () => {
    setMustSpin(false); // Stop spinning
    setWinner(participants[prizeNumber]); // Set the winner
  };

  return (
    <div className="wheel-draw">
      <h2>Siber Şans Çarkı</h2>
      <p>O şanslı olanı görelim!</p>

      {/* Input section for adding participants */}
      <div className="input-container">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="İsim ekle"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddParticipant(); // Add participant on Enter key
          }}
        />
        <div className="input-buttons">
          <button onClick={handleAddParticipant} className="btn neon-add">
            Ekle
          </button>
          <button onClick={onBack} className="btn neon-back">
            Geri Dön
          </button>
        </div>
      </div>

      {/* Wheel Display */}
      <div className="futuristic-wheel-container">
        {data.length > 0 ? (
          <>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={[
                '#0ff',
                '#f0f',
                '#ff0',
                '#2ecc71',
                '#e67e22',
                '#3498db',
              ]}
              textColors={['#000']}
              onStopSpinning={onStopSpinning}
              outerBorderColor="#222"
              outerBorderWidth={6}
              innerRadius={10}
              radiusLineColor="#555"
              radiusLineWidth={2}
              fontSize={16}
            />
            <button onClick={handleSpinClick} className="btn neon-spin">
              Çevir!
            </button>
          </>
        ) : (
          <p className="no-participants">Lütfen en az bir isim ekleyin.</p> 
        )}
      </div>

      {/* Winner Announcement */}
      {winner && (
        <div className="winner neon-text">
          <h3>Kazanan: {winner} 🎉</h3>
        </div>
      )}
    </div>
  );
}

export default WheelDraw;
