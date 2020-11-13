/** Small utility functions that are used in multiple places, and don't fit
  *  anywhere else in the codebase. */

/** Format human-friendly number. Add commas, round to nearest whole number. */
export const formatNumberBasic = (n: number) => {
  return Math.round(n).toLocaleString('en');
};

/** Round a number to the given number of decimal places. */
export const roundToDecimalPlaces = (n: number, precision: number) => {
  return Math.round(n * (10 ** precision)) / (10 ** precision);
};

/** Format a human-friendly number, using "Millions" or "Billions" if it's big enough. */
export const formatUserNumber = (n: number) => {
  if (n > 10 ** 9) {
    return `${roundToDecimalPlaces(n / 10**9, 1)} Billion`;
  } if (n > 10 ** 6) {
    return `${roundToDecimalPlaces(n / 10**6, 1)} Million`;
  }
  return formatNumberWithCommas(n);
};