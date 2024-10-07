import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { getInternals } from "../services/InternalService";

let requires = await getInternals()

export const requireFilterTemplate = (options) => {
  return (
    <MultiSelect
      value={options.value}
      options={requires}
      itemTemplate={requireItemTemplate}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="סנן"
      className="p-column-filter"
    />
  );
};

const requireItemTemplate = (option) => {
  return <p>{option}</p>;
};

export const requireEditor = (options) => {
  return (
    <Dropdown
      value={options.value}
      options={requires}
      itemTemplate={requireItemTemplate}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="בחר גוף דורש"
      className="p-column-filter"
    />
  );
};
