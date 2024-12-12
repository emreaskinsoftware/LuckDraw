import React, { useState } from 'react';
import './MultiRaffle.css'; // CSS dosyasını bağlayalım

function MultiRaffle() {
  const [participantList, setParticipantList] = useState([]); // Katılımcılar
  const [winnerCount, setWinnerCount] = useState(1); // Kazanan sayısı
  const [repeatAllowed, setRepeatAllowed] = useState(false); // İsmin tekrar edebilirliği
  const [fileError, setFileError] = useState(''); // Dosya yükleme hataları

  // İsim ekleme işlemi
  const handleAddParticipant = (name) => {
    if (name.trim() === '') return;
    setParticipantList((prev) => [...prev, name.trim()]);
  };

  // Dosyadan isim yükleme
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith('.txt')) {
      setFileError('Lütfen yalnızca .txt uzantılı bir dosya yükleyin.');
      return;
    }
    setFileError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const names = content.split('\n').map((line) => line.trim());
      setParticipantList((prev) => [...prev, ...names]);
    };
    reader.readAsText(file);
  };

  // Katılımcı listesini temizleme
  const handleClearParticipants = () => {
    setParticipantList([]);
  };

  return (
    <div className="multi-raffle-container">
      <h2>Çoklu Çekiliş</h2>
      <p>Katılımcılarınızı belirleyin ve çekilişe başlayın!</p>

      {/* Çekiliş Ayarları */}
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
          Aynı isim birden fazla kez kazanabilir:
          <input
            type="checkbox"
            checked={repeatAllowed}
            onChange={(e) => setRepeatAllowed(e.target.checked)}
            className="raffle-checkbox"
          />
        </label>
      </div>

      {/* Katılımcı Yönetimi */}
      <div className="raffle-controls">
        <input
          type="text"
          placeholder="Katılımcı ismi girin"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddParticipant(e.target.value);
          }}
          className="raffle-text-input"
        />
        <button
          onClick={handleClearParticipants}
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
      {fileError && <p className="file-error">{fileError}</p>}

      {/* Katılımcı Listesi */}
      <div className="participant-list">
        <h3>Katılımcılar:</h3>
        <ul>
          {participantList.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MultiRaffle;
