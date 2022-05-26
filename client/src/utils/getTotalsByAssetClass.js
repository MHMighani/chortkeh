// Returns asset's totals, grouped by their assetClass
// calculates the values by their purchase price

function getTotalsByAssetClass(assets) {
  const initialAmounts = { goldCurrency: 0, stock: 0, cash: 0, total: 0 };

  const amounts = assets.reduce((last, current) => {
    const assetValue = current.amount * (current?.purchasePrice || 1);
    last[current.assetClass] += assetValue;
    last.total += assetValue;
    return last;
  }, initialAmounts);

  return amounts;
}

export default getTotalsByAssetClass;
