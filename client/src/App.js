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
import "react-toastify/dist/ReactToastify.css";
import { fetchAll } from "./actions";
import { useDispatch } from "react-redux";

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
        <Route exact path="/add/goldcurrency/" component={GoldCurrencyForm} />
        <Route exact path="/add/stock" component={StockForm} />
        <Route exact path="/add/cash" component={CashForm} />
      </Switch>
      <Footer />
      <ToastContainer position="top-center" hideProgressBar rtl icon={false} />
    </div>
  );
}

export default App;
