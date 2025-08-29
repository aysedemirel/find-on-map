import { MAPILLARY_BBOXES } from '../constants/bboxes';

export function getRandomBbox() {
  const index = Math.floor(Math.random() * MAPILLARY_BBOXES.length);
  return MAPILLARY_BBOXES[index];
}
