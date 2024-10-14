import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { externals, factorableTypes } from "../services/consts";
import { getExternalImag } from "../services/ExternalsService";

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
        src={getExternalImag(option.image)}
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

  let factor = { name: '', image: '' };

  if (rowData.factorableType == factorableTypes.EXTERNAL)
    factor = rowData.external;
  else {
    factor.name = rowData.internal.command;
    factor.image = "inside.png";
  }   
  return (
    <div className="flex align-items-center gap-2">
      <img
        alt={factor.name}
        src={getExternalImag(factor.image)}
        width="32"
      />
      <p>{factor.name}</p>
    </div>
  );
};
