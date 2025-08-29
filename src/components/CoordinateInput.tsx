import React from 'react';

interface CoordinateInputProps {
  coords: [number, number] | null;
  onConfirm: () => void;
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({ coords, onConfirm }) => {
  return (
    <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
      <input
        type="text"
        value={coords ? `${coords[0]}, ${coords[1]}` : ''}
        readOnly
        style={{ flex: 1, padding: '6px' }}
      />
      <button onClick={onConfirm}>OK</button>
    </div>
  );
};

export default CoordinateInput;
