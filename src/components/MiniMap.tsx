import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import MapView from './MapView';

interface MiniMapProps {
  onSelect: (coords: [number, number]) => void;
  selectedPos: [number, number] | null;
  isConfirm: boolean;
}

const MiniMap: React.FC<MiniMapProps> = ({ selectedPos, isConfirm, onSelect }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="mini-map-view"
      style={{
        width: expanded ? '400px' : '200px',
        height: expanded ? '300px' : '150px'
      }}>
      <div>
        <MapView onSelect={onSelect} isConfirm={isConfirm} selectedPos={selectedPos} />
        <button onClick={() => setExpanded(!expanded)} className="mini-map-btn">
          {expanded ? <MinusCircleOutlined size={16} /> : <PlusCircleOutlined size={16} />}
        </button>
      </div>
      <p className="direction-txt">Mark your guess on the map</p>
    </div>
  );
};

export default MiniMap;
