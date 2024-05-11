type DateFormat =
  | "hh:MM"
  | "dd/mm/yyyy"
  | "dd-mm-yyyy"
  | "yyyy-mm-dd"
  | "hh:MM dd/mm/yyyy";

export function formatDate(format: DateFormat, date: Date) {
  if (format === "dd/mm/yyyy") {
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  } else if (format === "hh:MM dd/mm/yyyy") {
    const minute = date.getMinutes();
    return (
      date.getHours() +
      ":" +
      (minute < 10 ? "0" + minute : minute) +
      (date.getHours() < 12 ? "AM " : "PM ") +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear()
    );
  } else if (format === "yyyy-mm-dd") {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  } else if (format === "hh:MM") {
    const minute = date.getMinutes();
    return (
      date.getHours() +
      ":" +
      (minute < 10 ? "0" + minute : minute) +
      (date.getHours() < 12 ? "AM " : "PM ")
    );
  } else {
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  }
}
