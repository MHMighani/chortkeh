import { useEffect, useState } from "react";
import axios from "axios";
import AssetsTable from "./components/assetsTable";

function App() {
  const serverUrl = "http://localhost:3001/pricesObject";

  const [spotPrices, setSpotPrices] = useState({
    coin: "0",
    halfCoin: "0",
    quarterCoin: "0",
    dollarPrice: "0",
    euroPrice: "0",
  });
  const assetsData = {
    Sekeh: [
      { name: "سکه تمام بهار آزادی", amount: 2, sellPrice: spotPrices.coin },
      { name: "نیم سکه", amount: 1, sellPrice: spotPrices.halfCoin },
      { name: "ربع سکه", amount: 1, sellPrice: spotPrices.quarterCoin },
    ],
  };

  useEffect(() => {
    async function fetchApi() {
      let response = await axios.get(serverUrl);
      setSpotPrices(response.data);
    }

    fetchApi();
  }, []);

  return (
    <div className="App">
      <AssetsTable assetsData={assetsData["Sekeh"]} />
    </div>
  );
}

export default App;
