function getCommaSepNum(num) {
  const inputType = typeof num;
  if (inputType === "string" || inputType === "number") {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return num;
}

export default getCommaSepNum;
