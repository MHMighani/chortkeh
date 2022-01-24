const jsonServer = require("json-server");
const { runningPort, databasePath } = require("./config.json");
require("./goldCurrency.js");
require("./stock.js");
require("./initialDbSetup.js");

const PORT = runningPort;
const server = jsonServer.create();
const pricesRouter = jsonServer.router(databasePath);

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(pricesRouter);
server.listen(PORT, () => {
  console.log(`json server is running at port ${PORT}`);
});
