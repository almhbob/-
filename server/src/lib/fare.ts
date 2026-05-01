export function estimateFare(distanceKm: number, zoneMultiplier = 1) {
  const baseFare = 500;
  const perKmFare = 300;
  const minimumFare = 1000;
  const raw = Math.round((baseFare + distanceKm * perKmFare) * zoneMultiplier);
  return Math.max(raw, minimumFare);
}
