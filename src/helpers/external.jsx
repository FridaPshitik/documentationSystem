import { factorableTypes } from "../services/consts";
import { getExternalImage } from "../services/ExternalsService";


export const externalItemTemplate = (option) => {
  return (
    <div className="flex align-items-center gap-2">
      <img
        alt={option.name}
        src={getExternalImage(option.image)}
        width="32"
      />
      <span>{option.name}</span>
    </div>
  );
};

export const externalBodyTemplate = (rowData) => {

  let factor = { name: '', image: '' };

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
        src={getExternalImage(factor.image)}
        width="32"
      />
      <p>{factor.name}</p>
    </div>
  );
};
