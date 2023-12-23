import { format } from "date-fns";

const dateFormat = (date) => {
  return format(Number(date), "yyyy-MM-dd'T'HH:mm:ss");
};
export default dateFormat;
