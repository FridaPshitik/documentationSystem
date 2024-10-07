import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { factorableTypes, getFactorableTypeColor } from "../services/consts";


export const factorableTypeRowFilterTemplate = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={Object.values(factorableTypes)}
      onChange={(e) => options.filterApplyCallback(e.value)}
      itemTemplate={factorableTypesItemTemplate}
      placeholder="סנן"
      className="p-column-filter"
    />
  );
};

const factorableTypesItemTemplate = (option) => {
  return (
    <Tag
      value={option}
      style={{ background: getFactorableTypeColor(option) }}
    />
  );
};

export const factorableTypeBodyTemplate = (rowData) => {
  return (
    <Tag
      value={rowData.factorableType}
      style={{
        background: getFactorableTypeColor(rowData.factorableType),
        width: "5rem",
        height: "3rem",
        fontSize: "0.8rem",
      }}
    />
  );
};

export const factorableTypeEditor = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={Object.values(factorableTypes)}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="בחר סוג"
      itemTemplate={(option) => {
        return (
          <Tag
            value={option}
            style={{ background: getFactorableTypeColor(option) }}
          ></Tag>
        );
      }}
    />
  );
};
