import { MultiSelect } from "primereact/multiselect";
import { getExternalsNameImage } from "../services/ExternalsService";
import { getInternalsNameImage } from "../services/InternalService";
import { getExternalImag } from "../services/ExternalsService";
import { factorableTypes } from "../services/consts";
import { externalEditor } from "./external";
import { internalEditor } from "./internal";
import { getProjects } from "../services/ProjectService"

const getPerforms = async () => {
  try {
    let exter = await getExternalsNameImage();
    let inter = await getInternalsNameImage();
    let pro = await getProjects()
    let internalsPerform = pro.data.filter(item => item.internal).map(item => item.internal.command);
    inter = inter.filter(item => internalsPerform.includes(item.name));
    return exter.concat(inter);
  } catch (error) {
    return error;
  } 
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
        src={getExternalImag(rowData.image)}
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
      <img alt={factor.image} src={getExternalImag(factor.image)} width="32" />
      <p>{factor.name}</p>
    </div>
  );
};

export const performEditor = (options) => {
  if (options.rowData.factorableType === factorableTypes.EXTERNAL)
    return externalEditor(options);
  return internalEditor(options);
};
