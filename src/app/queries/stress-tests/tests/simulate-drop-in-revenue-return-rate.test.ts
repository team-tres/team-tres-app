import { describe, it, expect } from 'vitest';
import simulateDropInRevenueReturnRate from '../simulate-drop-in-revenue-return-rate';
import { MAX_FORECAST_SIZE } from '../../../../config/constants';

describe('Stress Test 2 - Edge Cases', () => {
  it('generic data', () => {
    const data = {
      netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
      investmentRate: 0.0375,
      investmentRateDrop: 0.6,
    };
    const result = simulateDropInRevenueReturnRate(data);
    expect(result.stressEffects).toBeInstanceOf(Array);
    expect(result.stressEffects).toHaveLength(MAX_FORECAST_SIZE);
    expect(result.residualEffects).toBeInstanceOf(Array);
    expect(result.residualEffects).toHaveLength(MAX_FORECAST_SIZE);
    expect(result.stressEffects[0]).toBeCloseTo(3443, 0);
    expect(result.stressEffects[11]).toBeCloseTo(4056, 0);
    expect(result.residualEffects[0]).toBeCloseTo(207, 0);
    expect(result.residualEffects[11]).toBeCloseTo(21261, 0);
  });

  describe('Net sales', () => {
    it('epmty net sales, return arrays filled with zeroes', () => {
      const data = {
        netSales: [], // Edge case: empty net sales
        investmentRate: 0.0375,
        investmentRateDrop: 0.6,
      };
      const result = simulateDropInRevenueReturnRate(data);
      expect(result.stressEffects).toBeInstanceOf(Array);
      expect(result.stressEffects).toHaveLength(MAX_FORECAST_SIZE);
      expect(result.residualEffects).toBeInstanceOf(Array);
      expect(result.residualEffects).toHaveLength(MAX_FORECAST_SIZE);
      expect(result.stressEffects.every((v) => v === 0)).toBe(true);
      expect(result.residualEffects.every((v) => v === 0)).toBe(true);
    });

    it('NaN value in array, throws error', () => {
      const data = {
        netSales: [
          153034,
          155329,
          157659,
          160024,
          NaN, // Edge case: NaN value
          164861,
          167334,
          169844,
          172391,
          174977,
          122602,
          180266,
        ],
        investmentRate: 0.0375,
        investmentRateDrop: 0.6,
      };
      expect(() => simulateDropInRevenueReturnRate(data))
        .toThrowError('Invalid input: Array contains a non-number value.');
    });

    it('non-number value in array, throws error', () => {
      const data = {
        netSales: [
          153034,
          155329,
          157659,
          160024,
          162424,
          164861,
          167334,
          'wasawt', // Edge case: non-number value
          172391,
          174977,
          122602,
          180266,
        ],
        investmentRate: 0.0375,
        investmentRateDrop: 0.6,
      };
      expect(() => simulateDropInRevenueReturnRate(data))
        .toThrowError('Invalid input: Array contains a non-number value.');
    });

    it('negative value in array, throws error', () => {
      const data = {
        netSales: [
          153034,
          155329,
          157659,
          160024,
          162424,
          164861,
          167334,
          -169844,
          172391,
          174977,
          122602,
          180266,
        ], // Edge case: empty net sales
        investmentRate: 0.0375,
        investmentRateDrop: 0.6,
      };
      expect(() => simulateDropInRevenueReturnRate(data))
        .toThrowError('Invalid input: Array should only contain positive values.');
    });
  });

  describe('Investment Rate', () => {
    it('NaN rate, throws error', () => {
      const data = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: NaN, // Edge case: NaN rate
        investmentRateDrop: 0.6,
      };
      expect(() => simulateDropInRevenueReturnRate(data))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('non-number rate, throws error', () => {
      const data = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: 'warswa', // Edge case: non-number rate
        investmentRateDrop: 0.6,
      };
      expect(() => simulateDropInRevenueReturnRate(data))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('negative rate, throws error', () => {
      const data = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: -1, // Edge case: negative rate
        investmentRateDrop: 0.6,
      };
      expect(() => simulateDropInRevenueReturnRate(data))
        .toThrowError('Invalid input: Interest rate must be 0% or higher.');
    });

    it('0% rate, returns 0 for both arrays', () => {
      const data = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: 0, // Edge case: 0 rate
        investmentRateDrop: 0.6,
      };
      const result = simulateDropInRevenueReturnRate(data);
      expect(result.stressEffects).toBeInstanceOf(Array);
      expect(result.stressEffects).toHaveLength(MAX_FORECAST_SIZE);
      expect(result.residualEffects).toBeInstanceOf(Array);
      expect(result.residualEffects).toHaveLength(MAX_FORECAST_SIZE);
      expect(result.stressEffects.every((v) => v === 0)).toBe(true);
      expect(result.residualEffects.every((v) => v === 0)).toBe(true);
    });
  });

  describe('Investment Rate Drop', () => {
    it('NaN drop, throws error', () => {
      const data = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: 0.0375,
        investmentRateDrop: NaN, // Edge case: NaN drop
      };
      expect(() => simulateDropInRevenueReturnRate(data))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('non-number drop, throws error', () => {
      const data = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: 0.0375,
        investmentRateDrop: 'wataw', // Edge case: non-number drop
      };
      expect(() => simulateDropInRevenueReturnRate(data))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('negative drop, clamps and returns', () => {
      const data = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: 0.0375,
        investmentRateDrop: -1, // Edge case: negative drop
      };
      const controlData = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: 0.0375,
        investmentRateDrop: 0, // Control case: 0% drop
      };
      const result = simulateDropInRevenueReturnRate(data);
      const controlResult = simulateDropInRevenueReturnRate(controlData);
      expect(result).toEqual(controlResult);
    });

    it('0% drop, returns same as no stress effect', () => {
      const data = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: 0.0375,
        investmentRateDrop: 0, // Edge case: 0% drop
      };
      const result = simulateDropInRevenueReturnRate(data);
      expect(result.stressEffects.every(v => v === 0)).toBe(true);
      expect(result.residualEffects.every(v => v === 0)).toBe(true);
    });

    it('>100% drop, clamps and returns as 100% drop', () => {
      const data = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: 0.0375,
        investmentRateDrop: 1000, // Edge case: >100% drop
      };
      const controlData = {
        netSales: [153034, 155329, 157659, 160024, 162424, 164861, 167334, 169844, 172391, 174977, 122602, 180266],
        investmentRate: 0.0375,
        investmentRateDrop: 1, // Control case: 100% drop
      };
      const result = simulateDropInRevenueReturnRate(data);
      const controlResult = simulateDropInRevenueReturnRate(controlData);
      expect(result).toEqual(controlResult);
    });
  });
});
