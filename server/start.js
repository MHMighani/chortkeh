require("./index.js");

const PORT = 3001;
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("coinPrice.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(PORT, () => {
  console.log(`json server is running at ${PORT} port`);
});
