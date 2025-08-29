import React from 'react';

interface CoordinateInputProps {
  coords: [number, number] | null;
  onConfirm: () => void;
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({ coords, onConfirm }) => {
  return (
    <div className="coordinate-container">
      <input
        type="text"
        value={coords ? `${coords[0]}, ${coords[1]}` : ''}
        readOnly
        className="coordinate-input"
      />
      <button onClick={onConfirm} className="finish-btn">
        OK
      </button>
    </div>
  );
};

export default CoordinateInput;
