import { Route, Switch } from "react-router-dom";
import Assets from "./components/assets";
import AssetForm from "./components/assetForm";
import AssetCategorySelect from "./components/assetCategorySelect";
import { ToastContainer } from "react-toastify";
import NavbarT from "./components/navbar";
import "react-toastify/dist/ReactToastify.css";

import StockForm from "./components/stockForm";

function App() {
  return (
    <div className="App">
      <NavbarT />
      <Switch>
        <Route exact path="/assets" component={Assets} />
        <Route exact path="/add/goldcurrency/" component={AssetForm} />
        <Route exact path="/add/stock" component={StockForm} />
        <Route exact path="/add" component={AssetCategorySelect} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
