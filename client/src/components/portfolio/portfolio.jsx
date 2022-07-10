import _ from "lodash";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTotalsByAssetClass, getQuotaStatus } from "../../utils";
import { fetchAll } from "../../actions";
import useAuth from "../../hooks/useAuth";

const Portfolio = () => {
  const [quotaStatus, setQuotaStatus] = useState({
    goldCurrency: 0,
    stock: 0,
    cash: 0,
  });
  const { token } = useAuth();

  const assets = useSelector((state) => state.assets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  useEffect(() => {
    const totals = getTotalsByAssetClass(assets);
    const quotaStatus = getQuotaStatus(totals);
    setQuotaStatus({ ...quotaStatus });
  }, [assets]);

  if (!token) {
    return <Redirect to="login" />;
  }

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
          Object.entries(quotaStatus).map(
            ([assetClass, quota]) =>
              quota && (
                <span
                  key={assetClass}
                  className={`quota ${assetClass}`}
                  style={{
                    width: `${quota}%`,
                    backgroundColor: `${colors[assetClass]}`,
                  }}
                >
                  {labels[assetClass]}
                </span>
              )
          )
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
