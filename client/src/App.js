import { Redirect, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import GoldCurrencyForm from "./components/forms/goldCurrencyForm";
import { ToastContainer } from "react-toastify";
import NavbarT from "./components/layout/navbar";
import StockForm from "./components/forms/stockForm";
import CashForm from "./components/forms/cashForm";
import AssetDetails from "./components/tables/assetsTable/assetDetails";
import PortfolioDetails from "./components/portfolio/portfolioDetails";
import Portfolio from "./components/portfolio/portfolio";
import Footer from "./components/layout/footer";
import OpeningModal from "./components/common/openingModal";
import { fetchAll } from "./actions";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <div className="App">
      <OpeningModal />
      <NavbarT />
      <Switch>
        <Redirect from="/chortkeh" to="/" />
        <Route exact path="/" component={Portfolio} />
        <Route path="/portfolio-details" component={PortfolioDetails} />
        <Route path="/assets/details/" component={AssetDetails} />
        <Route path="/add/goldcurrency/:id?" component={GoldCurrencyForm} />
        <Route path="/add/stock/:id?" component={StockForm} />
        <Route exact path="/add/cash/:id?" component={CashForm} />
      </Switch>
      <Footer />
      <ToastContainer position="top-center" hideProgressBar rtl icon={false} />
    </div>
  );
}

export default App;
