import { useEffect, useState } from 'react';
import CoordinateInput from './components/CoordinateInput';
import MapillaryViewer from './components/MapillaryViewer';
import { getDistanceInMeters } from './helpers/distance';
import { getRandomImageInBbox } from './helpers/mapillaryApi';
import { getRandomBbox } from './helpers/randomBox';
import type { MapillaryImage } from './types/MapillaryImage';
import Header from './components/Header';
import MiniMap from './components/MiniMap';
import GuessModal from './components/GuessModal';
import LoadingView from './components/LoadingView';

const ID = import.meta.env.VITE_MAPILLARY_TOKEN;

function App() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [selectedPos, setSelectedPos] = useState<[number, number] | null>(null);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [imageId, setImageId] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isReload, setIsReload] = useState<boolean>(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReload]);

  if (!imageId) return <LoadingView />;

  const handleConfirm = () => {
    if (!selectedPos) return;
    const distanceKm =
      getDistanceInMeters(Number(lat), Number(lon), selectedPos[0], selectedPos[1]) / 1000;
    setDistance(distanceKm);
    setIsConfirm(true);
  };

  const handleReplay = () => {
    setIsConfirm(false);
    setDistance(null);
    setSelectedPos(null);
    setLat('');
    setLon('');
    setImageId(null);
    setIsReload((prev) => !prev);
  };

  return (
    <>
      <Header />
      <MapillaryViewer imageId={imageId ?? ''} token={ID} />
      <MiniMap
        isConfirm={isConfirm}
        selectedPos={lat && lon ? [parseFloat(lat), parseFloat(lon)] : null}
        onSelect={setSelectedPos}
      />
      <CoordinateInput coords={selectedPos} onConfirm={handleConfirm} />
      {isConfirm && (
        <GuessModal
          distance={distance ?? 0}
          handleReplay={handleReplay}
          selectPos={selectedPos ?? [0, 0]}
          firstPosition={[Number(lat), Number(lon)]}
        />
      )}
    </>
  );
}

export default App;
