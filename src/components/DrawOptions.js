import React from 'react';
import { Link } from 'react-router-dom';

function DrawOptions({ handleWheelClick }) {
  return (
    <div className="draw-options">
      <button className="btn primary" onClick={handleWheelClick}>
        Çarklı Çekiliş
      </button>
      <Link to="/multi" style={{ textDecoration: 'none' }}>
        <button className="btn">
          Çok Seçenekli Çekiliş
        </button>
      </Link>
    </div>
  );
}

export default DrawOptions;
