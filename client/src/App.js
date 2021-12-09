import { Route, Switch } from "react-router-dom";
import Assets from "./components/assets";
import AssetForm from "./components/assetForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StockForm from "./components/stockForm";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/assets" component={Assets} />
        <Route exact path="/assets/:id" component={AssetForm} />
        <Route exact path="/addstock" component={StockForm} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
