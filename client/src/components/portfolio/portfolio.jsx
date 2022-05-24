import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchPrices, fetchAssets, fetchHistoryRecord } from "../../actions";

const Portfolio = () => {
  const [quotaStatus, setQuotaStatus] = useState({
    goldCurrency: 0,
    stock: 0,
    cash: 0,
  });
  const assets = useSelector((state) => state.assets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAssets());
    dispatch(fetchPrices());
    dispatch(fetchHistoryRecord());
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    const initialAmounts = { goldCurrency: 0, stock: 0, cash: 0 };

    const amounts = assets.reduce((last, current) => {
      const assetValue = current.amount * (current?.purchasePrice || 1);
      last[current.assetClass] += assetValue;
      total += assetValue;
      return last;
    }, initialAmounts);

    for (let assetClass in amounts) {
      amounts[assetClass] /= total / 100;
    }

    setQuotaStatus({ ...amounts });
  }, [assets]);

  const colors = {
    goldCurrency: "Gold",
    stock: "green",
    cash: "silver",
  };

  console.log(quotaStatus);

  const labels = { goldCurrency: "طلا وارز", cash: "نقدی", stock: "سهام" };

  return (
    <div className="portfolio">
      <div className="portfolio__quota-bar">
        {Object.entries(quotaStatus).map(([assetClass, quota]) => (
          <span
            key={assetClass}
            className={`quota ${assetClass}`}
            style={{
              display: quota ? "initial" : "none",
              width: `${quota}%`,
              backgroundColor: `${colors[assetClass]}`,
            }}
          >
            {labels[assetClass]}
          </span>
        ))}
      </div>
      <div className="portfolio__operations">
        <Link to="/portfolio-details" className="link details">
          جزئیات
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
