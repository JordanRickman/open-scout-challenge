

export const formatNumberWithCommas = (n: number) => {
  return String(n); // TODO
};

export const roundToDecimalPlaces = (n: number, precision: number) => {
  return Math.round(n * (10 ** precision)) / (10 ** precision);
};

export const formatUserNumber = (n: number) => {
  if (n > 10 ** 9) {
    return `${roundToDecimalPlaces(n / 10**9, 1)} Billion`;
  } if (n > 10 ** 6) {
    return `${roundToDecimalPlaces(n / 10**6, 1)} Million`;
  }
  return formatNumberWithCommas(n);
};