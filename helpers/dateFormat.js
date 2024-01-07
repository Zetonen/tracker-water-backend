import { format } from "date-fns";

const dateFormat = (date) => {
  const adjustedDate = new Date(Number(date));
  return format(adjustedDate, "yyyy-MM-dd'T'HH:mm:ss");
};
export default dateFormat;
