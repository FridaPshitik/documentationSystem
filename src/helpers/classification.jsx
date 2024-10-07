import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { classifications, getClassificationColor } from "../services/consts";


export const classificationRowFilterTemplate = (options) => {

  return (
    <Dropdown
      value={options.value}
      options={Object.values(classifications)}
      onChange={(e) => options.filterApplyCallback(e.value)}
      itemTemplate={classificationItemTemplate}
      placeholder="סנן"
      className="p-column-filter"
    />
  );
};

const classificationItemTemplate = (option) => {
  return (
    <Tag
      value={option}
      style={{ background: getClassificationColor(option) }}
    />
  );
};

export const classificationBodyTemplate = (rowData) => {
  return (
    <Tag
      value={rowData.classification}
      style={{
        background: getClassificationColor(rowData.classification),
        width: "5rem",
        height: "3rem",
        fontSize: "0.8rem",
      }}
    />
  );
};

export const classificationEditor = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={Object.values(classifications)}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="בחר סוג סיווג"
      itemTemplate={(option) => {
        return (
          <Tag
            value={option}
            style={{ background: getClassificationColor(option) }}
          ></Tag>
        );
      }}
    />
  );
};
