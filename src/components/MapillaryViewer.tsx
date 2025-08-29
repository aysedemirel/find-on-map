import { Viewer } from 'mapillary-js';
import React, { useEffect, useRef } from 'react';

type Props = {
  imageId: string;
  token: string;
};

const MapillaryViewer: React.FC<Props> = ({ imageId, token }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new Viewer({
      container: containerRef.current,
      accessToken: token,
      imageId: imageId
    });

    viewer.on('image', (event) => {
      console.log('Current image:', event.image.id);
    });

    return () => {
      viewer.remove();
    };
  }, [imageId, token]);

  return (
    <div ref={containerRef} style={{ width: '1700px', height: '800px', background: '#000' }} />
  );
};

export default MapillaryViewer;
