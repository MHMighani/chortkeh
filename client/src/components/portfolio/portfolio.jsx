import _ from "lodash";
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
    const initialAmounts = { goldCurrency: 0, stock: 0, cash: 0 };

    const amounts = assets.reduce((last, current) => {
      const assetValue = current.amount * (current?.purchasePrice || 1);
      last[current.assetClass] += assetValue;
      return last;
    }, initialAmounts);

    const total = _.sum(Object.values(amounts));

    for (let assetClass in amounts) {
      const value = (amounts[assetClass] / total) * 100 || 0;
      amounts[assetClass] = value;
    }

    setQuotaStatus({ ...amounts });
  }, [assets]);

  const colors = {
    goldCurrency: "Gold",
    stock: "green",
    cash: "silver",
  };

  const labels = { goldCurrency: "طلا وارز", cash: "نقدی", stock: "سهام" };

  return (
    <div className="portfolio">
      <div className="portfolio__quota-bar">
        {_.sum(Object.values(quotaStatus)) === 0 ? (
          <h3 className="empty-note">این پورتفولیو خالی است</h3>
        ) : (
          Object.entries(quotaStatus).map(([assetClass, quota]) => (
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
          ))
        )}
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
