import { Route, Switch } from "react-router-dom";
import Assets from "./components/assets";
import AddAsset from "./components/addAsset";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/assets" component={Assets} />
        <Route exact path="/add" component={AddAsset} />
      </Switch>
    </div>
  );
}

export default App;
