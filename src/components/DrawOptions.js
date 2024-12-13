// React Core Imports
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * DrawOptions Component
 * Renders the main selection buttons for choosing between
 * Wheel Draw and Multi-Option Draw features.
 *
 * @param {Function} handleWheelClick - Function triggered on wheel draw button click
 */
function DrawOptions({ handleWheelClick }) {
  return (
    <div className="draw-options">
      {/* Wheel Draw Button */}
      <button className="btn primary" onClick={handleWheelClick}>
        Çarklı Çekiliş
      </button>

      {/* Multi-Option Draw Button */}
      <Link to="/multi" style={{ textDecoration: 'none' }}>
        <button className="btn">Çok Seçenekli Çekiliş</button>
      </Link>
    </div>
  );
}

export default DrawOptions;
