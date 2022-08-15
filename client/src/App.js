import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import * as forms from "./components/forms/";
import AssetDetails from "./components/tables/assetsTable/assetDetails";
import PortfolioDetails from "./components/portfolio/portfolioDetails/portfolioDetails";
import Portfolio from "./components/portfolio/portfolio/portfolio";
import Layout from "./components/layout";
import PrivateRoute from "./components/privateRoute";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/login" component={forms.LoginForm} />
          <Route exact path="/signup" component={forms.SignupForm} />
          <PrivateRoute>
            <Route exact path="/" component={Portfolio} />
            <Route path="/portfolio-details" component={PortfolioDetails} />
            <Route path="/assets/details/" component={AssetDetails} />
            <Route
              path="/add/goldcurrency/:id?"
              component={forms.GoldCurrencyForm}
            />
            <Route path="/add/stock/:id?" component={forms.StockForm} />
            <Route exact path="/add/cash/:id?" component={forms.CashForm} />
          </PrivateRoute>
        </Switch>
        <ToastContainer
          position="top-center"
          hideProgressBar
          rtl
          icon={false}
        />
      </Layout>
    </div>
  );
}

export default App;
