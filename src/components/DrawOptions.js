import React from 'react';

function DrawOptions({ handleWheelClick }) {
  return (
    <div className="draw-options">
      <button className="btn primary" onClick={handleWheelClick}>
        Çarklı Çekiliş
      </button>
      <button className="btn" disabled>
        Çok Seçenekli Çekiliş (Yakında)
      </button>
    </div>
  );
}

export default DrawOptions;
