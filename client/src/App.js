import { useEffect, useState } from "react";
import { deleteAsset, getAssets } from "./sevices/assetsService";
import AssetsTable from "./components/assetsTable";

function App() {
  const [assetsData, setAssetsData] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      let response = await getAssets();

      setAssetsData(response.data);
    }

    fetchApi();
  }, []);

  return (
    <div className="App">
      <AssetsTable
        assetsData={assetsData}
        onDeleteAsset={async (id) => {
          const newAssetsData = assetsData.filter((asset) => asset.id !== id);

          setAssetsData(newAssetsData);
          deleteAsset(id);
        }}
      />
    </div>
  );
}

export default App;
