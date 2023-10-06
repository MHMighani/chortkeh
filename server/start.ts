const jsonServer = require("json-server");
const { runningPort, databasePath } = require("./config.json");
require("./initialDbSetup.js");
require("./goldCurrency.js");
require("./stock.js");

const auth = require("json-server-auth");
const PORT = runningPort;
const app = jsonServer.create();
const router = jsonServer.router(databasePath);

// auth guard rules
const rules = auth.rewriter({
  assets: 600,
  history: 600,
  GoldCurrency: 660,
  stock: 660,
});

const middlewares = jsonServer.defaults();

// binding router db to the app for json-server-auth usage
app.db = router.db;

app.use(rules);
app.use(middlewares);
app.use(auth);
app.use(router);
app.listen(PORT, () => {
  console.log(`json server is running at port ${PORT}`);
});
