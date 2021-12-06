const jsonServer = require("json-server");
const configFile = require("./config.json");
require("./goldCurrency.js");
require("./stock.js");

const PORT = configFile.runningPort;
const server = jsonServer.create();
const pricesRouter = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(pricesRouter);
server.listen(PORT, () => {
  console.log(`json server is running at port ${PORT}`);
});
