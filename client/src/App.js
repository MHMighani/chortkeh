import { Route, Switch } from "react-router-dom";
import Assets from "./components/assets";
import AssetForm from "./components/assetForm";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/assets" component={Assets} />
        <Route exact path="/assets/:id" component={AssetForm} />
      </Switch>
    </div>
  );
}

export default App;
