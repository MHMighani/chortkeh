import StyledValue from "../components/common/styledValue";

// returns styled data for table cells
export default function getStyledData(dataWithChanges, nuetralCols = []) {
  return dataWithChanges.map(({ ...row }) => {
    for (let key in row) {
      // check for columns with no change
      if (nuetralCols.includes(key)) continue;

      row[key] = (
        <StyledValue
          value={row[key].value}
          percentChange={row[key].percentChange}
        />
      );
    }
    return row;
  });
}
