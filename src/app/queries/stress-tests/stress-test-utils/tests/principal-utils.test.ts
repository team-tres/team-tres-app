import { describe, it, expect } from 'vitest';
import calculatePrincipal from '../principal-utils';
import { MAX_FORECAST_SIZE } from '../../../../../config/constants';

describe('calculatePrincipal', () => {
  it('generic data, all differences of 8', () => {
    const result = calculatePrincipal([
      108, 208, 308, 408, 508, 608, 708, 808, 908, 1008, 1108, 1208,
    ], [
      100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
    ]);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(MAX_FORECAST_SIZE);
    expect(result.every((v) => v === 8)).toBe(true);
  });

  it('negative values, throws an error', () => {
    expect(() => calculatePrincipal([
      -8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // Negative value at the start of the first array
    ], [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])).toThrow('Invalid input: Array should only contain positive values.');
    expect(() => calculatePrincipal([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // Negative value at the start of the second array
    ], [
      -8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])).toThrow('Invalid input: Array should only contain positive values.');
    expect(() => calculatePrincipal([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8, // Negative value at the end of the first array
    ], [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])).toThrow('Invalid input: Array should only contain positive values.');
    expect(() => calculatePrincipal([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ], [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -8, // Negative value at the end of the second array
    ])).toThrow('Invalid input: Array should only contain positive values.');
  });

  it('alternating zero values, alternates between 8 and -8 result', () => {
    const result = calculatePrincipal([
      8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, // Edge case: 0 values
    ], [
      0, 8, 0, 8, 0, 8, 0, 8, 0, 8, 0, 8, // Edge case: 0 values
    ]);
    expect(result).toEqual([
      8, -8, 8, -8, 8, -8, 8, -8, 8, -8, 8, -8,
    ]);
  });

  describe('baseline and stress Balances', () => {
    it('mismatched array lenghs, throws error', () => {
      expect(() => calculatePrincipal(
        [
          108, 208, 308, 408, 508, 608, 708, 808, 908, 1008, 1108, 1208,
        ], [
          100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, // Edge case: two more indeces
        ])).toThrow('Invalid Input: Mismatched array lengths.');
    });

    it('handles empty arrays gracefully', () => {
      const result = calculatePrincipal([], []);
      expect(result.every((v) => v === 0)).toBe(true);
    });

    it('array indeces less than Forecast minimum, throws an error', () => {
      expect(() => calculatePrincipal(
        [
          108, 208, 308, 408, 508, 608, 708, 808, 908, 1008, 1108, // Edge case: less than MAX_FORECAST_SIZE indeces
        ],
        [
          100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, // Edge case: less than MAX_FORECAST_SIZE indeces
        ],
      )).toThrow(`Invalid input: Array should contain at least ${MAX_FORECAST_SIZE} elements.`);
    });

    it('invalid array data type, throws an error', () => {
      expect(() => calculatePrincipal([
        108, 208, 308, 408, 508, 608, 708, 808, 908, 1008, 1108, 1208,
      ], [
        100, 200, 300, 400, 500, NaN, 700, 800, 900, 1000, 1100, 1200, // Edge case: NaN value
      ])).toThrow('Invalid input: Array contains a non-number value.');
    });

    it('negative value in array, throws an error', () => {
      expect(() => calculatePrincipal([
        108, 208, 308, 408, 508, 608, 708, 808, 908, 1008, 1108, 1208,
      ], [
        100, 200, 300, 400, -500, 600, 700, 800, 900, 1000, 1100, 1200, // Edge case: negative value
      ])).toThrow('Invalid input: Array should only contain positive values.');
    });
  });
});
