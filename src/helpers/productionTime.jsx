import { Calendar } from "primereact/calendar";
import { statuses } from "../services/consts";

export const productionTimeFilterTemplate = (options) => {
  return (
    <Calendar
      value={options.value}
      onChange={(e) => options.filterCallback(e.value, options.index)}
      dateFormat="dd/mm/yy"
      placeholder="dd/mm/yyyy"
      mask="99/99/9999"
    />
  );
};

export const productionTimeBodyTemplate = (rowData) => {
  return rowData.status === statuses.DONE
    ? formatDate(rowData.productionTime)
    : "";
};

const formatDate = (value) => {
  return value.toLocaleDateString("he-IL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const productionTimeEditor = (options) => {
  let date;
  if (options.value != "Invalid Date") date = options.value;
  else date = new Date();

  return options.rowData.status === statuses.DONE ? (
    <Calendar
      value={date}
      onChange={(e) => {
        options.editorCallback(e.value);
      }}
      dateFormat="dd/mm/yy"
      placeholder={date}
      mask="99/99/9999"
    />
  ) : (
    ""
  );
};
