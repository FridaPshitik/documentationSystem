import { MultiSelect } from "primereact/multiselect";
import { factorableTypes } from "../services/consts";
import { externalEditor } from "./external";
import { internalEditor } from "./internal";

export const performRowFilterTemplate = (options) => {
  let performs = [];
  return (
    <MultiSelect
      value={options.value}
      options={performs}
      itemTemplate={performBodyTemplate}
      onChange={(e) => options.filterApplyCallback(e.value)}
      optionLabel="name"
      placeholder="סנן"
      className="p-column-filter"
    />
  );
};

export const performBodyTemplate = (rowData) => {
  let factor = { name: "", image: "" };

  if (rowData.factorableType === factorableTypes.EXTERNAL)
    factor = rowData.external;
  else {
    factor.name = rowData.internal.command;
    factor.image = "inside.png";
  }
  return (
    <div className="flex align-items-center gap-2">
      <img
        alt={factor.name}
        src={window.location.origin + `/images/${factor.image}`}
        width="32"
      />
      <p>{factor.name}</p>
    </div>
  );
};

export const performEditor = (options) => {
  if (options.rowData.factorableType === factorableTypes.EXTERNAL)
    return externalEditor(options);
  return internalEditor(options);
};
