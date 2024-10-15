import { Dropdown } from "primereact/dropdown";
import { factorableTypes } from "../services/consts";
import { getExternalImag, getExternalDisplay } from "../services/ExternalsService";

export const externals = await getExternalDisplay();

export const externalEditor = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={externals.data}
      itemTemplate={ItemTemplate}
      onChange={(e) => {
        options.editorCallback(e.value);
        options.rowData.external = e.value;
        options.rowData.externalId = e.value.id;
      }}
      optionLabel="name"
      placeholder={options.value.name}
      className="p-column-filter"
    />
  );
};

const ItemTemplate = (option) => {
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
