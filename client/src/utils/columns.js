const rowNum = { name: "rowNum", label: "ردیف" };
const amountCol = { name: "amount", label: "مقدار" };
const operationsCol = { name: "operations" };
const averagePurchasePriceCol = {
  name: "purchasePrice",
  label: "میانگین قیمت خرید",
};
const purchasePriceCol = { name: "purchasePrice", label: "قیمت خرید" };
const changePercentCol = { name: "changePercent", label: "درصد سود یا زیان" };
const purchaseDateCol = { name: "purchaseDate", label: "تاریخ خرید" };
const priceCol = { name: "price", label: "ارزش روز" };
const overallValueCol = { name: "overallValue", label: "ارزش کل" };
const nameCol = { name: "label", label: "نام دارایی" };

export const cashTableColumns = [rowNum, nameCol, amountCol, operationsCol];

export const assetsTableColumns = [
  rowNum,
  nameCol,
  amountCol,
  averagePurchasePriceCol,
  priceCol,
  changePercentCol,
  overallValueCol,
  operationsCol,
];

export const detailsTableColumns = [
  rowNum,
  amountCol,
  purchasePriceCol,
  changePercentCol,
  purchaseDateCol,
  overallValueCol,
  operationsCol,
];

export const historyTableColumns = [
  rowNum,
  { name: "id", label: "تاریخ" },
  { name: "goldCurrency", label: "طلا و ارز" },
  { name: "stock", label: "بورس" },
  { name: "cash", label: "نقدی" },
  { name: "overall", label: "ارزش کل" },
];

const columns = {
  cash: cashTableColumns,
  history: historyTableColumns,
  details: detailsTableColumns,
  goldCurrency: assetsTableColumns,
  goldcurrency: assetsTableColumns,
  stock: assetsTableColumns,
};

export default columns;
