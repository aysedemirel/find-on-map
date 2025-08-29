import type { MapillaryImage } from '../types/MapillaryImage';

export async function getRandomImageInBbox(
  bbox: [number, number, number, number],
  token: string
): Promise<MapillaryImage> {
  const url = `https://graph.mapillary.com/images?access_token=${token}&fields=id,geometry&bbox=${bbox.join(
    ','
  )}&limit=50&is_pano=true`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Mapillary API request failed');
  }

  const data = await res.json();

  if (!data.data || data.data.length === 0) {
    throw new Error('No images found in this area');
  }

  const index = Math.floor(Math.random() * data.data.length);
  return data.data[index];
}

export async function getClosestImage(
  lat: number,
  lon: number,
  token: string
): Promise<MapillaryImage> {
  const url = `https://graph.mapillary.com/images?access_token=${token}&fields=id,geometry&closeto=${lon},${lat}&limit=1`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Mapillary API request failed');

  const data = await res.json();
  if (!data.data || data.data.length === 0) throw new Error('No nearby image found');

  return data.data[0];
}
