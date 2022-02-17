function getPercentChange(firstValue, secondValue, decimalPoint = 2) {
  return Number(
    (((secondValue - firstValue) / firstValue) * 100).toFixed(decimalPoint)
  );
}

export default getPercentChange;
