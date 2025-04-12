import { MAX_FORECAST_SIZE } from '../config/constants';

// Validate if value is a number
export const isValidNumber = (value: any): boolean => typeof value === 'number' && !Number.isNaN(value);

// Validate if negative value
export const isNegative = (value: number): boolean => value < 0;

// Validate if positive value
export const isPositive = (amount: number): boolean => amount >= 0 && !Number.isNaN(amount);

// Validate if percentage value
export const isValidPercentage = (percentage: number): boolean => percentage >= 0 && percentage <= 1;

// Validate if percentage value
export const isInvalidPercentage = (percentage: number): boolean => percentage < 0 || percentage > 1;

export const isValidPeriod = (period: number): boolean => period > 0
  && !Number.isNaN(period)
  && typeof period === 'number';

export const isValidInterestRate = (intRate: number): boolean => intRate >= 0
&& !Number.isNaN(intRate)
&& typeof intRate === 'number';

export const isValidArray = (arr: any[], type: String): void => {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid input: Input must be an array.');
  }

  if (arr.length < MAX_FORECAST_SIZE) {
    throw new Error(`Invalid input: Array should contain at least ${MAX_FORECAST_SIZE} elements.`);
  }

  if (arr.length > Number.MAX_VALUE) {
    throw new Error(`Invalid input: Array should contain no more than ${Number.MAX_VALUE} elements.`);
  }

  for (const item of arr) {
    if (type === 'number' && (typeof item !== 'number' || Number.isNaN(item))) {
      throw new Error(`Invalid input: Array contains a non-${type} value.`);
    }
    if (type === 'number' && item < 0) {
      throw new Error('Invalid input: Array should only contain positive values.');
    }
  }
};

// Validate positive numbers, percentages, and interest rates
export const validateValue = (value: number, type: 'positive' | 'percentage' | 'interestRate'): number => {
  if (Number.isNaN(value) || typeof value !== 'number') {
    throw new Error('Invalid input: Value must be a valid number.');
  }

  if (type === 'positive') {
    if (value < 0) {
      throw new Error('Invalid input: Value must be a positive number.');
    }
    return value;
  }

  if (type === 'percentage') {
    if (value < 0 || value > 1) {
      throw new Error('Percentage must be between 0 and 1.');
    }
    return value;
  }

  if (type === 'interestRate') {
    if (value < 0) {
      throw new Error('Invalid input: Interest rate must be 0% or higher.');
    }
    return value;
  }

  throw new Error('Invalid type.'); // Add a default return statement for any other type
};

// Clamp Percantages to 0-100%
export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

// Vaidates a percentage and clamps it to the 0-1 range if invalid
export const validateAndClampPercentage = (value: number): number => {
  if (isValidNumber(value)) {
    if (isInvalidPercentage(value)) {
      // If it's an invalid percentage, clamp it to the 0-1 range
      return clamp(value, 0, 1);
    }
    return value; // Valid percentage, no need to clamp
  }
  throw new Error('Invalid input: Value must be a valid number.');
};
