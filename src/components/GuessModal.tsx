import MapView from './MapView';

interface Props {
  distance: number;
  handleReplay: () => void;
  selectPos: [number, number];
  firstPosition: [number, number];
}
const GuessModal: React.FC<Props> = ({ distance, selectPos, firstPosition, handleReplay }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Result</h2>
        <MapView
          isConfirm
          onSelect={() => {}}
          selectedPos={selectPos}
          firstPosition={firstPosition}
          style={{ height: '50vh' }}
        />
        <p>
          Distance between two points:
          <br />
          <span>{distance.toFixed(2)} km</span>
        </p>
        <button className="replay-btn" onClick={handleReplay}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GuessModal;
