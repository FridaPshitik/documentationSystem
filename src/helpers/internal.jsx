import { Dropdown } from "primereact/dropdown";
import { getInternalDisplay } from "../services/InternalService";

export const internals = await getInternalDisplay();

export const internalEditor = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={internals}
      itemTemplate={ItemTemplate}
      onChange={(e) => {
        options.editorCallback(e.value);
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
