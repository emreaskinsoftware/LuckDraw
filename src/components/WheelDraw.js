import React, { useState } from 'react';
import './WheelDraw.css';
import { Wheel } from 'react-custom-roulette';

function WheelDraw() {
  const [participants, setParticipants] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [winner, setWinner] = useState('');
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const data = participants.map(name => ({ option: name }));

  const handleAddParticipant = () => {
    if (participants.length >= 12) {
      alert('En fazla 12 kişi ekleyebilirsiniz.');
      return;
    }
    if (!nameInput.trim()) {
      alert('Lütfen bir isim girin.');
      return;
    }
    setParticipants([...participants, nameInput.trim()]);
    setNameInput('');
  };

  const handleReady = () => {
    if (participants.length === 0) {
      alert('En az bir kişi eklemelisiniz.');
      return;
    }
    setIsReady(true);
  };

  const handleSpinClick = () => {
    const randomIndex = Math.floor(Math.random() * participants.length);
    setPrizeNumber(randomIndex);
    setMustSpin(true);
  };

  const onStopSpinning = () => {
    setMustSpin(false);
    setWinner(participants[prizeNumber]);
  };

  return (
    <div className="wheel-draw">
      <h2>Çarklı Çekiliş</h2>
      <p>Şansını dene ve kazananı belirle!</p>

      {!isReady ? (
        <div className="input-container">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="İsim ekle"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddParticipant();
            }}
          />
          <button onClick={handleAddParticipant} className="btn secondary" style={{ marginTop: '10px' }}>
            Ekle
          </button>
          <ul className="participants-list" style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
            {participants.map((name, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>{name}</li>
            ))}
          </ul>
          <button onClick={handleReady} className="btn primary" style={{ marginTop: '20px' }}>
            Tamam
          </button>
        </div>
      ) : (
        <div>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            backgroundColors={['#e67e22', '#2ecc71']}
            textColors={['#fff']}
            onStopSpinning={onStopSpinning}
          />
          <button onClick={handleSpinClick} className="btn primary" style={{ marginTop: '20px' }}>
            Çevir!
          </button>
        </div>
      )}

      {winner && (
        <div className="winner">
          <h3>Kazanan: {winner} 🎉</h3>
        </div>
      )}
    </div>
  );
}

export default WheelDraw;
