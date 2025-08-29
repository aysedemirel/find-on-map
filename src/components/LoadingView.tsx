const LoadingView = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading, please wait...</p>
        <p>Get ready, the world is waiting for you!</p>
      </div>
    </div>
  );
};

export default LoadingView;
