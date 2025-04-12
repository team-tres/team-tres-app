import { describe, it, expect } from 'vitest';
import simulateDropInInvestmentReturnRate, { StressData } from '../simulate-drop-in-investment-return-rate';
import { MAX_FORECAST_SIZE } from '../../../../config/constants';

describe('Stress Test 1', () => {
  it('generic data', () => {
    const data: StressData = {
      investmentAmount: 999999,
      interestRate: 0.06,
      interestRateDrop: 0.3,
      impactedYears: 10,
      reinvestmentPercentage: 0,
    };
    const result = simulateDropInInvestmentReturnRate(data);
    expect(result.stressEffects).toBeInstanceOf(Array);
    expect(result.stressEffects).toHaveLength(MAX_FORECAST_SIZE);
    expect(result.residualEffects).toBeInstanceOf(Array);
    expect(result.residualEffects).toHaveLength(MAX_FORECAST_SIZE);
  });

  describe('Interest Rate', () => {
    it('NaN value, throws error', () => {
      const data: StressData = {
        investmentAmount: 999999,
        interestRate: NaN, // Edge case: NaN interest rate
        interestRateDrop: 0.3,
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      expect(() => simulateDropInInvestmentReturnRate(data))
        .toThrowError('Invalid input: Value must be a valid number.');
    });

    it('non-number value, throws error', () => {
      const data: StressData = {
        investmentAmount: 999999,
        interestRate: 'wawat', // Edge case: non-number interest rate
        interestRateDrop: 0.3,
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      expect(() => simulateDropInInvestmentReturnRate(data))
        .toThrowError();
    });

    it('negative value, throws error', () => {
      const data: StressData = {
        investmentAmount: 999999,
        interestRate: -0.06, // Edge case: negative interest rate
        interestRateDrop: 0.3,
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      expect(() => simulateDropInInvestmentReturnRate(data))
        .toThrowError();
    });

    it('0 value, has no affect on the result', () => {
      const data: StressData = {
        investmentAmount: 999999,
        interestRate: 0, // Edge case:
        interestRateDrop: 0.3,
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      const result = simulateDropInInvestmentReturnRate(data);
      expect(result.stressEffects[0]).toEqual(result.stressEffects[1]);
    });
  });

  describe('Interest Rate Drop', () => {
    it('NaN value, throws error', () => {
      const data: StressData = {
        investmentAmount: 999999,
        interestRate: 0.06,
        interestRateDrop: NaN, // Edge case: NaN rate drop
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      expect(() => simulateDropInInvestmentReturnRate(data))
        .toThrowError();
    });

    it('non-number value, throws error', () => {
      const data: StressData = {
        investmentAmount: 999999,
        interestRate: 0.06,
        interestRateDrop: 'watwa', // Edge case: non-number rate drop
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      expect(() => simulateDropInInvestmentReturnRate(data))
        .toThrowError();
    });

    it('negative value, clamps up to 0% rate drop', () => {
      const data: StressData = {
        investmentAmount: 999999,
        interestRate: 0.06,
        interestRateDrop: -0.3, // Edge case: negative rate drop
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      const controlData: StressData = {
        investmentAmount: 999999,
        interestRate: 0.06,
        interestRateDrop: 0, // Control case: 0% rate drop
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      const result = simulateDropInInvestmentReturnRate(data);
      const controlResult = simulateDropInInvestmentReturnRate(controlData);
      expect(result).toEqual(controlResult);
    });

    it('0 value, has no affect on the result', () => {
      const data: StressData = {
        investmentAmount: 999999,
        interestRate: 0.06,
        interestRateDrop: 0, // Edge case: 0 rate drop
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      const result = simulateDropInInvestmentReturnRate(data);
      expect(result.stressEffects[0]).toEqual(result.stressEffects[1]);
    });

    it('>100%, clamps down to 100% rate drop', () => {
      const data: StressData = {
        investmentAmount: 999999,
        interestRate: 0.06,
        interestRateDrop: 100, // Edge case: 0 rate drop
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      const controlData: StressData = {
        investmentAmount: 999999,
        interestRate: 0.06,
        interestRateDrop: 1, // Control case: 100% rate drop
        impactedYears: 10,
        reinvestmentPercentage: 0,
      };
      const result = simulateDropInInvestmentReturnRate(data);
      const controlResult = simulateDropInInvestmentReturnRate(controlData);
      expect(result).toEqual(controlResult);
    });
  });
});
