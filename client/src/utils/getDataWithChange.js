import getPercentChange from "./getPercentChange";

function getDataWithChange(data, constKeys = []) {
  return data.map((item, index, arr) => {
    const newItem = { ...item };

    const prevItem = arr[index - 1];

    for (let key in item) {
      // skiping date column
      if (constKeys.includes(key)) continue;

      // checks for first record that previous info is not provided for it
      const percentChange = index && getPercentChange(prevItem[key], item[key]);
      const change = index && Math.abs(prevItem[key] - item[key]);
      newItem[key] = { percentChange, change, value: item[key] };
    }

    return newItem;
  });
}

export default getDataWithChange;
