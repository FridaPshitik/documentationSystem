import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { environments, getEnvironmentColor } from "../services/consts";


export const environmentRowFilterTemplate = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={Object.values(environments)}
      onChange={(e) => options.filterApplyCallback(e.value)}
      itemTemplate={environmentItemTemplate}
      placeholder="סנן"
      className="p-column-filter"
    />
  );
};

const environmentItemTemplate = (option) => {
  return (
    <Tag value={option} style={{ background: getEnvironmentColor(option) }} />
  );
};

export const environmentBodyTemplate = (rowData) => {
  return (
    <Tag
      value={rowData.environment}
      style={{
        background: getEnvironmentColor(rowData.environment),
        width: "5rem",
        height: "3rem",
        fontSize: "0.8rem",
      }}
    />
  );
};

export const environmentEditor = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={Object.values(environments)}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="בחר סביבת פיתוח"
      itemTemplate={(option) => {
        return (
          <Tag
            value={option}
            style={{ background: getEnvironmentColor(option) }}
          ></Tag>
        );
      }}
    />
  );
};
