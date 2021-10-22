const PORT = 3001;
// require("./goldCurrency.js");
const jsonServer = require("json-server");
const server = jsonServer.create();
const pricesRouter = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(pricesRouter);
server.listen(PORT, () => {
  console.log(`json server is running at port ${PORT}`);
});
