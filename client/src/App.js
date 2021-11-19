import { Route, Switch } from "react-router-dom";
import Assets from "./components/assets";
import AssetForm from "./components/assetForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/assets" component={Assets} />
        <Route exact path="/assets/:id" component={AssetForm} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
