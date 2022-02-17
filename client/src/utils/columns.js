const rowNum = { name: "rowNum", label: "ردیف" };
const amountCol = { name: "amount", label: "مقدار" };
const editBtnCol = { name: "editBtn" };
const deleteBtnCol = { name: "deleteBtn" };
const averagePurchasePriceCol = {
  name: "purchasePrice",
  label: "میانگین قیمت خرید",
};
const purchasePriceCol = { name: "purchasePrice", label: "قیمت خرید" };
const changePercentCol = { name: "changePercent", label: "درصد سود یا زیان" };
const purchaseDateCol = { name: "purchaseDate", label: "تاریخ خرید" };
const priceCol = { name: "price", label: "ارزش روز" };
const overallValueCol = { name: "overallValue", label: "ارزش کل" };
const detailBtnCol = { name: "detailBtn" };
const nameCol = { name: "label", label: "نام دارایی" };

export const cashTableColumns = [
  rowNum,
  nameCol,
  amountCol,
  editBtnCol,
  deleteBtnCol,
];

export const assetsTableColumns = [
  rowNum,
  nameCol,
  amountCol,
  averagePurchasePriceCol,
  priceCol,
  changePercentCol,
  overallValueCol,
  detailBtnCol,
  deleteBtnCol,
];

export const detailsTableColumns = [
  rowNum,
  amountCol,
  purchasePriceCol,
  changePercentCol,
  purchaseDateCol,
  overallValueCol,
  editBtnCol,
  deleteBtnCol,
];

export const historyTableColumns = [
  rowNum,
  { name: "id", label: "تاریخ" },
  { name: "goldCurrency", label: "طلا و ارز" },
  { name: "stock", label: "بورس" },
  { name: "cash", label: "نقدی" },
  { name: "overall", label: "ارزش کل" },
];
