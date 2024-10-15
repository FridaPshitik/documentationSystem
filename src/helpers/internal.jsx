import { Dropdown } from "primereact/dropdown";
import { getInternalDisplay } from "../services/InternalService";

export const internals = await getInternalDisplay();

export const internalEditor = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={internals.data}
      itemTemplate={ItemTemplate}
      onChange={(e) => {
        options.editorCallback(e.value);
        options.rowData.internal = e.value
        options.rowData.internalId = e.value.id
      }}
      optionLabel="command"
      placeholder={options.rowData.internal.command}
      className="p-column-filter"
    />
  );
};

const ItemTemplate = (option) => {
  return (
    <div>
      <p>{option.command}</p>
    </div>
  );
};
