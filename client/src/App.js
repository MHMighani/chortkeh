import Assets from "./components/assets";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/assets" component={Assets} />
      </Switch>
    </div>
  );
}

export default App;
