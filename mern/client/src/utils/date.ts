import moment from "moment";

export const formatDate = (date: string, format: string = "DD/MM/YYYY") => {
  return date ? moment.utc(date).format(format) : date;
};

export const checkExpired = (date: string) => {
  const currentDateTime = new Date();
  const expirationDateTime = new Date(date);
  return currentDateTime > expirationDateTime;
};

export const getTime = (date: string) => {
  const postedDateTime = moment(date);
  const currentDateTime = moment();
  const diffInSeconds = currentDateTime.diff(postedDateTime, "seconds");
  const diffInMinutes = currentDateTime.diff(postedDateTime, "minutes");
  const diffInHours = currentDateTime.diff(postedDateTime, "hours");
  const diffInDays = currentDateTime.diff(postedDateTime, "days");
  const diffInMonths = currentDateTime.diff(postedDateTime, "months");
  const diffInYears = currentDateTime.diff(postedDateTime, "years");

  if (diffInYears >= 1) {
    return `Posted ${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  } else if (diffInMonths >= 1) {
    return `Posted ${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  } else if (diffInDays >= 1) {
    return `Posted ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours >= 1) {
    return `Posted ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes >= 1) {
    return `Posted ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds >= 1) {
    return `Posted ${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
  } else {
    return `Posted just now`;
  }
};
