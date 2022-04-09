import getDateId from "../utils/getDateId";

// gets mapped assets and returns object with overall Values of main classes
function getNormalizedOverallValue(mappedAssets) {
  const todayDate = getDateId();
  return mappedAssets.reduce(
    (prev, current) => {
      prev[current.assetClass] = current.overallValue;
      prev.overall += current.overallValue;
      return prev;
    },
    { overall: 0, id: todayDate }
  );
}

export default getNormalizedOverallValue;
