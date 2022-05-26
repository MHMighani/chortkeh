function getQuotaStatus(totals) {
  const quotaStatus = { goldCurrency: 0, stock: 0, cash: 0 };

  for (let assetClass in quotaStatus) {
    const value = (totals[assetClass] / totals.total) * 100 || 0;
    quotaStatus[assetClass] = value;
  }

  return quotaStatus;
}

export default getQuotaStatus;
