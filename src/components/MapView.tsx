import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from 'react-leaflet';

interface MapPickerProps {
  onSelect: (coords: [number, number]) => void;
  selectedPos: [number, number] | null;
  isConfirm: boolean;
}

const MapView: React.FC<MapPickerProps> = ({ selectedPos, isConfirm, onSelect }) => {
  const [firstPos, setFirstPos] = useState<[number, number] | null>(null);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setFirstPos([e.latlng.lat, e.latlng.lng]);
        onSelect([e.latlng.lat, e.latlng.lng]);
      }
    });

    return (
      <>
        {firstPos && (
          <Marker position={firstPos} icon={new L.Icon.Default()}>
            <Popup>First coordinate</Popup>
          </Marker>
        )}
        {selectedPos && isConfirm && (
          <Marker
            position={selectedPos}
            icon={
              new L.Icon({
                iconUrl:
                  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl:
                  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              })
            }>
            <Popup>Second coordinate</Popup>
          </Marker>
        )}

        {firstPos && selectedPos && isConfirm && (
          <Polyline positions={[firstPos, selectedPos]} color="blue" />
        )}
      </>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[41, 29]} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapView;
