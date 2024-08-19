import moment from "moment";

export function formDataDateTime(datetime) {
  return moment(datetime).format("DD/MM/YYYY h:mm:ss A");
}
