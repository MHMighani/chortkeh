import {
  getAssetsBySubClass,
  addAsset,
  getAssets,
  addAssets,
  deleteAllAssets,
  deleteAssetBySubClass,
} from "./assetsServices";

const assets = [
  {
    id: 1,
    amount: 2,
    purchasePrice: 110000000,
    assetClass: "goldCurrency",
    assetSubClass: "coinForTest1",
  },
  {
    id: 2,
    amount: 2,
    purchasePrice: 110000000,
    assetClass: "goldCurrency",
    assetSubClass: "coinForTest2",
  },
  {
    id: 3,
    amount: 3,
    purchasePrice: 11000005,
    assetClass: "goldCurrency",
    assetSubClass: "coinForTest1",
  },
];

test("add one asset", async () => {
  const asset = assets[0];
  const response = await addAsset(asset);
  expect(response.data).not.toBeNull();
  expect(response.status).toBe(201);
  expect(response.data).toEqual(asset);
});

test("get assets of a certain subClass", async () => {
  const response = await getAssetsBySubClass("coinForTest1");
  const { data: assetsBySubClass } = response;

  expect(response.status).toBe(200);
  expect(assetsBySubClass).not.toBe(null);
  expect(assetsBySubClass).toBeInstanceOf(Array);

  for (let asset of assetsBySubClass) {
    expect(asset.assetSubClass).toBe("coinForTest1");
  }
});

test("adding multiple assets", async () => {
  const addingAssets = assets.slice(1);
  const { data: assetsBeforeAdding } = await getAssets();
  const responses = await addAssets(addingAssets);
  const { data: assetsAfterAdding } = await getAssets();

  for (let response of responses) {
    expect(response.status).toBe(201);
  }

  expect(assetsAfterAdding.length - assetsBeforeAdding.length).toBe(
    addingAssets.length
  );
});

test("delete assets by subclass", async () => {
  const subClass = "coinForTest1";

  const responses = await deleteAssetBySubClass(subClass);
  for (let response of responses) {
    expect(response.status).toBe(200);
  }

  const { data: assetsAfterDeletion } = await getAssets();

  for (let asset of assetsAfterDeletion) {
    expect(asset.subClass).not.toBe(subClass);
  }
});

test("delete all assets", async () => {
  const responses = await deleteAllAssets();

  const { data: assetsAfterDeletion } = await getAssets();

  // checking status for all deletion requests
  for (let response of responses) {
    expect(response.status).toBe(200);
  }
  expect(assetsAfterDeletion.length).toBe(0);
});
