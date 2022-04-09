import { Route, Switch } from "react-router-dom";
import GoldCurrencyForm from "./components/goldCurrencyForm";
import { ToastContainer } from "react-toastify";
import NavbarT from "./components/navbar";
import StockForm from "./components/stockForm";
import CashForm from "./components/cashForm";
import AssetDetails from "./components/assetDetails";
import PortfolioDetails from "./components/portfolioDetails";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <NavbarT />
      <Switch>
        <Route path="/portfolio-details" component={PortfolioDetails} />
        <Route path="/assets/details/" component={AssetDetails} />
        <Route exact path="/add/goldcurrency/" component={GoldCurrencyForm} />
        <Route exact path="/add/stock" component={StockForm} />
        <Route exact path="/add/cash" component={CashForm} />
      </Switch>

      <ToastContainer />
    </div>
  );
}

export default App;
