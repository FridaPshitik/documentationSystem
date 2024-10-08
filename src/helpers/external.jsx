import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { externals, factorableTypes } from "../services/consts";
import { getInternalDisplay, getInternals } from "../services/InternalService";

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
  console.log("option", option);
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

const internalsItemTemplate = (option) => {
  return (
    <div>
      <p>{option.command}</p>
    </div>
  )
}

const internals = await getInternalDisplay()

export const externalEditor = (options) => {
  console.log("externals", externals);
  console.log("options: ", options);
  if (options.rowData.factorableType == factorableTypes.EXTERNAL)
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

  return (
    <Dropdown
      value={options.value}
      options={internals}
      itemTemplate={internalsItemTemplate}
      onChange={(e) => {
        console.log("================================", e)
        options.editorCallback(e.value)
      }
      }
      optionLabel="command"
      placeholder={options.rowData.internal.command}
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
        src={window.location.origin + `/images/${factor.image}`}
        width="32"
      />
      <p>{factor.name}</p>
    </div>
  );
};