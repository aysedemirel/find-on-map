import { useEffect, useState } from 'react';
import CoordinateInput from './components/CoordinateInput';
import MapillaryViewer from './components/MapillaryViewer';
import MapView from './components/MapView';
import { getDistanceInMeters } from './helpers/distance';
import { getRandomImageInBbox } from './helpers/mapillaryApi';
import { getRandomBbox } from './helpers/randomBox';
import type { MapillaryImage } from './types/MapillaryImage';
import './App.css';

const ID = import.meta.env.VITE_MAPILLARY_TOKEN;

function App() {
  console.log('ID: ', ID);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [selectedPos, setSelectedPos] = useState<[number, number] | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const randomBbox = getRandomBbox();
        const img: MapillaryImage = await getRandomImageInBbox(randomBbox, ID);
        setImageId(img.id);
        setLat(img.geometry.coordinates[1].toString());
        setLon(img.geometry.coordinates[0].toString());
      } catch (err) {
        console.error(err);
      }
    }

    if (!imageId) load();
  }, []);

  if (!imageId) return <p>Loading...</p>;

  const handleConfirm = () => {
    if (!selectedPos) return;
    setIsConfirm(true);
    const distance =
      getDistanceInMeters(Number(lat), Number(lon), selectedPos[0], selectedPos[1]) / 1000;
    if (distance) {
      alert(`Distance between two coordinate: ${distance.toFixed(2)} km`);
    }
  };

  return (
    <>
      <MapillaryViewer imageId={imageId ?? ''} token={ID} />
      <MapView
        isConfirm={isConfirm}
        selectedPos={lat && lon ? [parseFloat(lat), parseFloat(lon)] : null}
        onSelect={setSelectedPos}
      />
      <CoordinateInput coords={selectedPos} onConfirm={handleConfirm} />
    </>
  );
}

export default App;
