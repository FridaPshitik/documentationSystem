import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { getStatusColor, statuses } from "../services/consts";


export const statusRowFilterTemplate = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={Object.values(statuses)}
      onChange={(e) => options.filterApplyCallback(e.value)}
      itemTemplate={statusItemTemplate}
      placeholder="סנן"
      className="p-column-filter"
    />
  );
};

const statusItemTemplate = (option) => {
  return <Tag value={option} style={{ background: getStatusColor(option) }} />;
};

export const statusBodyTemplate = (rowData) => {
  return (
    <Tag
      value={rowData.status}
      style={{
        background: getStatusColor(rowData.status),
        width: "5rem",
        height: "3rem",
        fontSize: "0.8rem",
      }}
    />
  );
};
