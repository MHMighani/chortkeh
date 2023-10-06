function getNumFromDotSepString(stringNum: string): string {
  return stringNum.split(",").join("");
}

module.exports = getNumFromDotSepString;
