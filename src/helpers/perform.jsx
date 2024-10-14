import { MultiSelect } from "primereact/multiselect";
import { factorableTypes } from "../services/consts";
import { getExternalsNameImage } from "../services/externalService";
import { getInternalsNameImage } from "../services/InternalService";
import { externalEditor } from "./external";
import { internalEditor } from "./internal";

const getPerforms = async () => {
  let exter = await getExternalsNameImage();
  let inter = await getInternalsNameImage();
  return exter.concat(inter);
};

let performs = await getPerforms();

export const performRowFilterTemplate = (options) => {
  return (
    <MultiSelect
      value={options.value}
      options={performs}
      itemTemplate={performBody}
      onChange={(e) => options.filterApplyCallback(e.value)}
      optionLabel="name"
      placeholder="סנן"
      className="p-column-filter"
    />
  );
};

const performBody = (rowData) => {
  return (
    <div className="flex align-items-center gap-2">
      <img
        alt={rowData.image}
        src={window.location.origin + `/images/${rowData.image}.png`}
        width="32"
      />
      <span>{rowData.name}</span>
    </div>
  );
};

export const performBodyTemplate = (rowData) => {
  let factor = rowData.perform;
  return (
    <div className="flex align-items-center gap-2">
      <img
        alt={factor.image}
        src={window.location.origin + `/images/${factor.image}.png`}
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
