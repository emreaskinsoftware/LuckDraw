import React, { useState, useEffect } from 'react';
import './MultiRaffle.css';
import Confetti from 'react-confetti';

function MultiRaffle() {
  // State definitions for managing raffle logic
  const [participantList, setParticipantList] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [winnerCount, setWinnerCount] = useState(1);
  const [repeatAllowed, setRepeatAllowed] = useState(false);
  const [winners, setWinners] = useState([]);
  const [raffleActive, setRaffleActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [currentWinner, setCurrentWinner] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [awaitNext, setAwaitNext] = useState(false);
  const [confettiDone, setConfettiDone] = useState(false);

  // Filter participants if repeat is not allowed
  const filterParticipants = (names) =>
    repeatAllowed ? names : [...new Set(names)];

  // Handle adding a new participant
  const handleAddParticipant = () => {
    const trimmedName = nameInput.trim();
    if (!trimmedName || (!repeatAllowed && participantList.includes(trimmedName))) {
      alert('Geçerli bir isim girin.');
      return;
    }
    setParticipantList((prev) => [...prev, trimmedName]);
    setNameInput('');
  };

  // Handle file upload for participants
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith('.txt')) {
      alert('Lütfen yalnızca .txt uzantılı bir dosya yükleyin.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const names = event.target.result
        .split('\n')
        .map((name) => name.trim())
        .filter((name) => name);

      setParticipantList((prev) => filterParticipants([...prev, ...names]));
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  // Update participants list when repeatAllowed changes
  useEffect(() => {
    if (!repeatAllowed) {
      setParticipantList(filterParticipants(participantList));
    }
  }, [repeatAllowed]);

  // Start the raffle
  const startRaffle = () => {
    if (
      participantList.length === 0 ||
      (winnerCount > participantList.length && !repeatAllowed)
    ) {
      alert('Katılımcı listesi boş veya kazanan sayısı fazla.');
      return;
    }
    setWinners([]);
    setRaffleActive(true);
    setCountdown(5);
  };

  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0 && raffleActive && !awaitNext) {
      pickNextWinner();
    }
  }, [countdown, raffleActive, awaitNext]);

  // Select the next winner
  const pickNextWinner = () => {
    const remainingParticipants = repeatAllowed
      ? participantList
      : participantList.filter((name) => !winners.includes(name));

    if (remainingParticipants.length === 0 || winners.length >= winnerCount) {
      setRaffleActive(false);
      setAwaitNext(false);
      setShowConfetti(false);
      setCurrentWinner('');
      setConfettiDone(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingParticipants.length);
    const newWinner = remainingParticipants[randomIndex];

    setCurrentWinner(newWinner);
    setWinners((prev) => [...prev, newWinner]);
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
      setAwaitNext(true);
    }, 3000);
  };

  // Proceed to the next winner
  const handleNext = () => {
    setCountdown(5);
    setAwaitNext(false);
  };

  // Reset the raffle
  const closeRaffle = () => {
    setParticipantList([]);
    setWinners([]);
    setRaffleActive(false);
    setShowConfetti(false);
    setNameInput('');
    setWinnerCount(1);
    setRepeatAllowed(false);
    setCountdown(0);
    setCurrentWinner('');
    setAwaitNext(false);
    setConfettiDone(false);
  };

  return (
    <div className="multi-raffle-container">
      <h2>Çoklu Çekiliş</h2>
      <p>Katılımcılarınızı belirleyin ve çekilişe başlayın!</p>

      <div className="raffle-info">
        <strong>Toplam Katılımcı: {participantList.length}</strong>
      </div>

      {showConfetti && (
        <Confetti
          numberOfPieces={300}
          recycle={false}
          onConfettiComplete={() => setConfettiDone(true)}
        />
      )}

      {raffleActive && countdown > 0 && (
        <div className="countdown-overlay">
          <h1>Çekiliş Başlıyor...</h1>
          <h2 className="countdown-number">{countdown}</h2>
        </div>
      )}

      <div className="raffle-settings">
        <label>
          Kazanan Sayısı:
          <input
            type="number"
            value={winnerCount}
            min="1"
            max={participantList.length || 1}
            onChange={(e) => setWinnerCount(Number(e.target.value))}
            className="raffle-input"
          />
        </label>
        <label>
          İsmin Tekrar Edilebilirliği:
          <input
            type="checkbox"
            checked={repeatAllowed}
            onChange={(e) => setRepeatAllowed(e.target.checked)}
            className="raffle-checkbox"
          />
        </label>
      </div>

      <div className="raffle-controls">
        <input
          type="text"
          placeholder="Katılımcı ismi girin"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="raffle-text-input"
        />
        <button onClick={handleAddParticipant} className="raffle-button add">
          Ekle
        </button>
        <button
          onClick={() => setParticipantList([])}
          className="raffle-button clear"
        >
          Listeyi Temizle
        </button>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="raffle-file-input"
        />
      </div>

      <div className="participant-list">
        <h3>Katılımcılar:</h3>
        <ul>
          {participantList.map((name, index) => (
            <li key={index}>
              <span className="participant-index">{index + 1}.</span> {name}
            </li>
          ))}
        </ul>
      </div>

      {!raffleActive && (
        <button onClick={startRaffle} className="raffle-button start">
          Çekilişi Başlat
        </button>
      )}

      {currentWinner && (
        <div className="current-winner">
          <h3>{currentWinner} 🎉</h3>
        </div>
      )}

      {winners.length > 0 && (
        <div className="winner-list">
          <h3>Kazananlar:</h3>
          <ul>
            {winners.map((winner, index) => (
              <li key={index}>
                <span className="winner-index">{index + 1}.</span> {winner}
              </li>
            ))}
          </ul>
        </div>
      )}

      {awaitNext && winners.length < winnerCount && (
        <button onClick={handleNext} className="raffle-button next">
          Devam Et
        </button>
      )}

      {(raffleActive || confettiDone || winners.length > 0) && (
        <button onClick={closeRaffle} className="raffle-button close">
          Çekilişi Kapat
        </button>
      )}
    </div>
  );
}

export default MultiRaffle;
