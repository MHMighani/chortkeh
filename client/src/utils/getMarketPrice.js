function getMarketPriceData(marketPrices, id) {
  const data = marketPrices.find((price) => price.id === id);
  return data;
}

export default getMarketPriceData;
