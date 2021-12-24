import { useState, useEffect } from "react";
import { getPrices } from "../services/pricesServices";

const useMarketPrices = (assetClass) => {
  const [marketPrices, setMarketPrices] = useState([]);

  useEffect(() => {
    async function getMarketPrices() {
      const response = await getPrices(assetClass);
      setMarketPrices(response.data);
    }

    getMarketPrices();
  }, [assetClass]);

  return marketPrices;
};

export default useMarketPrices;
