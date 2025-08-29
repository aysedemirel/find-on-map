import React from 'react';

interface CoordinateInputProps {
  coords: [number, number] | null;
  onConfirm: () => void;
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({ coords, onConfirm }) => {
  return (
    <div className="coordinate-container">
      <button onClick={onConfirm} className={coords === null ? 'description-txt' : 'finish-btn'}>
        {coords === null ? 'Mark your guess on the map' : 'GUESS'}
      </button>
    </div>
  );
};

export default CoordinateInput;
