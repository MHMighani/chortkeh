function getPercentChange(firstValue, secondValue, decimalPoint) {
  return (((secondValue - firstValue) / firstValue) * 100).toFixed(2);
}

export default getPercentChange;
