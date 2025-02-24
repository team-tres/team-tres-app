// src/app/queries/forecasts/calculate-forecast.ts

export function calculateAverageForecast(pastValues: number[]): number {
  if (pastValues.length === 0) return 0;
  return pastValues.reduce((sum, value) => sum + value, 0) / pastValues.length;
}

export function calculateMultiplierForecast(pastValues: number[], multiplier: number): number {
  if (pastValues.length === 0) return 0;
  const lastPastValue = pastValues[pastValues.length - 1]; // Get the latest year value
  return lastPastValue * (1 + multiplier); // Apply the multiplier (adds a percentage increase)
}
