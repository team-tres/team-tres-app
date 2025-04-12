import { describe, it, expect } from 'vitest';
import calculateResidualEffects from '../residual-effects';
import { MAX_FORECAST_SIZE } from '../../../../../config/constants';

describe('calculateResidualEffects', () => {
  it('generic data', () => {
    const result = calculateResidualEffects(
      [900, 1892, 2982, 4180, 5491, 6926, 8494, 10204, 12067, 14094, 16298, 18691],
    );
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(MAX_FORECAST_SIZE);
    expect(result[0]).toBeCloseTo(54, 0);
    expect(result[11]).toBeCloseTo(30720, 0);
  });

  it('empty array, returns array filled with zeroes', () => {
    const result = calculateResidualEffects([]);
    expect(result.every(val => val === 0)).toBe(true);
  });

  it('array smaller than forecast size, throws an error', () => {
    expect(() => calculateResidualEffects(
      [
        900,
        1892,
        2982,
        4180,
        5491,
        6926,
        8494,
        10204,
        12067,
        14094,
        16298, // Edge case: only 11 elements
      ],
    ))
      .toThrowError(`Invalid input: Array should contain at least ${MAX_FORECAST_SIZE} elements.`);
  });

  it('array bigger than forecast size, returns an array the size of forecast', () => {
    const result = calculateResidualEffects(
      [
        900,
        1892,
        2982,
        4180,
        5491,
        6926,
        8494,
        10204,
        12067,
        14094,
        16298,
        18691,
        22551, // Edge case: extra elements
      ],
    );
    expect(result).toHaveLength(MAX_FORECAST_SIZE);
  });

  it('NaN value in array, throws error', () => {
    expect(() => calculateResidualEffects(
      [
        900,
        1892,
        2982,
        4180,
        5491,
        6926,
        8494,
        NaN, // Edge case: NaN value
        12067,
        14094,
        16298,
        18691,
      ],
    ))
      .toThrowError('Invalid input: Array contains a non-number value.');
  });

  it('non-number in array, throws error', () => {
    expect(() => calculateResidualEffects(
      [
        900,
        1892,
        2982,
        4180,
        5491,
        6926,
        8494,
        'kizu', // Edge case: non-number value
        12067,
        14094,
        16298,
        18691,
      ],
    ))
      .toThrowError('Invalid input: Array contains a non-number value.');
  });

  it('negative-value in  array, throws error', () => {
    expect(() => calculateResidualEffects(
      [
        900,
        1892,
        2982,
        4180,
        5491,
        6926,
        8494,
        -2321, // Edge case: non-number value
        12067,
        14094,
        16298,
        18691,
      ],
    ))
      .toThrowError('Invalid input: Array should only contain positive values.');
  });

  it('zero-values, expect an array of zeroes', () => {
    const result = calculateResidualEffects([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // Edge case: zero values
    const expectation = new Array(MAX_FORECAST_SIZE).fill(0);
    expect(result).toEqual(expectation);
  });
});
