import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { externals } from "../services/consts";


export const externalRowFilterTemplate = (options) => {
  return (
    <MultiSelect
      value={options.value}
      options={externals}
      itemTemplate={externalsItemTemplate}
      onChange={(e) => options.filterApplyCallback(e.value)}
      optionLabel="name"
      placeholder="סנן"
      className="p-column-filter"
    />
  );
};

const externalsItemTemplate = (option) => {
  return (
    <div className="flex align-items-center gap-2">
      <img
        alt={option.name}
        src={window.location.origin + `/images/${option.image}`}
        width="32"
      />
      <span>{option.name}</span>
    </div>
  );
};

export const externalEditor = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={externals}
      itemTemplate={externalsItemTemplate}
      onChange={(e) => options.editorCallback(e.value)}
      optionLabel="name"
      placeholder={options.value.name}
      className="p-column-filter"
    />
  );
};

export const externalBodyTemplate = (rowData) => {
  const external = rowData.external;
  return (
    <div className="flex align-items-center gap-2">
      <img
        alt={external.name}
        src={window.location.origin + `/images/${external.image}`}
        width="32"
      />
      <p>{external.name}</p>
    </div>
  );
};
