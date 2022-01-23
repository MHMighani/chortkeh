function getMarketPriceData(marketPrices, id) {
  return marketPrices.find((price) => price.id === id);
}

export default getMarketPriceData;
