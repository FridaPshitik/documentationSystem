import { getExternalImage } from '../services/ExternalsService';


export const performBody = (rowData) => {
  return (
    <div className='flex align-items-center gap-2'>
      <img
        alt={rowData.image}
        src={getExternalImage(rowData.image)}
        width='32'
      />
      <span>{rowData.name}</span>
    </div>
  );
};

export const performBodyTemplate = (rowData) => {
  let factor = rowData.perform;
  return (
    <div className='flex align-items-center gap-2'>
      <img alt={factor.image} src={getExternalImage(factor.image)} width='32' />
      <p>{factor.name}</p>
    </div>
  );
};
