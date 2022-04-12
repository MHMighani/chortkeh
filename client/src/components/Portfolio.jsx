// import { useContext } from "react";
// import { AssetsContext } from "../context/assetsContext";
import { Link } from "react-router-dom";

const Portfolio = () => {
  // const [assetsData, assetsDataDispatch] = useContext(AssetsContext);

  const quotaStatus = {
    goldCurrency: 50,
    stock: 30,
    cash: 20,
  };

  const colors = {
    goldCurrency: "Gold",
    stock: "green",
    cash: "silver",
  };

  const labels = { goldCurrency: "طلا وارز", cash: "نقدی", stock: "سهام" };

  return (
    <div className="portfolio">
      <div className="portfolio__quota-bar">
        {Object.entries(quotaStatus).map(([assetClass, quota]) => (
          <span
            className={`quota ${assetClass}`}
            style={{
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
