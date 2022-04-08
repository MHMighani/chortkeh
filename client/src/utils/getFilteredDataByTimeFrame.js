import moment from "moment-jalali";

function getFilteredDateByTimeFrame(data = [], timeFrame) {
  const dateFormat = "jYYYY-jMM-jDD";

  const dataByTimeFrame = [data[0]];
  let round = 1;
  let start = moment(data[0].id, dateFormat);

  for (let record of data) {
    const diff = moment(record.id, dateFormat).diff(start, "days");

    if (diff + round * timeFrame < 0) {
      dataByTimeFrame.unshift(record);
      round += 1;
    }
  }

  return dataByTimeFrame;
}

export default getFilteredDateByTimeFrame;
