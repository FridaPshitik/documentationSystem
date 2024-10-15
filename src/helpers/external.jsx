import { Dropdown } from "primereact/dropdown";
import { getExternalDisplay } from "../services/externalService";

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
        src={window.location.origin + `/images/${option.image}`}
        width="32"
      />
      <span>{option.name}</span>
    </div>
  );
};
