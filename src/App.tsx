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
import CountdownTimer from './components/CountdownTimer';

const ID = import.meta.env.VITE_MAPILLARY_TOKEN;
const RETRY_MAX = 50;

function App() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [selectedPos, setSelectedPos] = useState<[number, number] | null>(null);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [imageId, setImageId] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [gameId, setGameId] = useState<number | null>(null);

  useEffect(() => {
    const startGame = () => {
      setGameId(Date.now());
    };

    async function load(retry = 0) {
      try {
        const randomBbox = getRandomBbox();
        const img: MapillaryImage | null = await getRandomImageInBbox(randomBbox, ID);

        if (!img && retry < RETRY_MAX) {
          return load(retry + 1);
        }

        if (!img) {
          throw new Error('No image found after multiple retries.');
        }

        setImageId(img.id);
        setLat(img.geometry.coordinates[1].toString());
        setLon(img.geometry.coordinates[0].toString());
        startGame();
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

  const handleTime = () => {
    setIsConfirm(true);
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
      {gameId && <CountdownTimer duration={2 * 60 * 1000} onTimeUp={handleTime} />}
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
