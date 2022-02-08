import { Route, Switch } from "react-router-dom";
import Assets from "./components/assets";
import GoldCurrencyForm from "./components/goldCurrencyForm";
import AssetCategorySelect from "./components/assetCategorySelect";
import { ToastContainer } from "react-toastify";
import NavbarT from "./components/navbar";
import StockForm from "./components/stockForm";
import CashForm from "./components/cashForm";
import AssetDetails from "./components/assetDetails";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <NavbarT />
      <Switch>
        <Route exact path="/assets" component={Assets} />
        <Route path="/assets/details/" component={AssetDetails} />
        <Route exact path="/add/goldcurrency/" component={GoldCurrencyForm} />
        <Route exact path="/add/stock" component={StockForm} />
        <Route exact path="/add/cash" component={CashForm} />
        <Route exact path="/add" component={AssetCategorySelect} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
