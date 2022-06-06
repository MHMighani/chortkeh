import moment from "moment-jalali";

function dateOperation(date, amount, format = "jYYYY-jMM-jDD") {
  return moment(date, format).subtract(amount, "day").format(format);
}

export default dateOperation;
