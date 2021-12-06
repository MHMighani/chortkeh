const axios = require("axios");
const editJsonFile = require("edit-json-file");
const configFile = require("./config.json");

const file = editJsonFile(`${__dirname}/db.json`);

// returns all stock symbols and their last updated prices
async function getTseSymbols() {
  const url = configFile.tse_watchlist_url;
  const res = await axios.get(url);
  const data = res.data.split(";");

  const reducer = (previousArr, currentValue) => {
    const symbolDataArray = currentValue.split(",");
    if (symbolDataArray.length === 23) {
      const mappedSymbol = {
        id: symbolDataArray[0],
        code: symbolDataArray[1],
        name: symbolDataArray[2],
        fullName: symbolDataArray[3],
        lastPrice: symbolDataArray[6],
        lastTradePrice: symbolDataArray[7],
      };

      previousArr.push(mappedSymbol);
    }
    return previousArr;
  };

  const symbols = data.reduce(reducer, []);
  file.set("stock", symbols);
  file.save();
}

getTseSymbols();
