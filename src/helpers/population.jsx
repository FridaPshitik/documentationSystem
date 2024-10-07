import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { getPopulationColor, populations } from "../services/consts";


export const populationRowFilterTemplate = (options) => {
  return (
    <MultiSelect
      value={options.value}
      options={Object.values(populations)}
      itemTemplate={populationItemTemplate}
      onChange={(e) => options.filterApplyCallback(e.value)}
      placeholder="סנן"
      className="p-column-filter"
    />
  );
};

const populationItemTemplate = (option) => {
  return (
    <Tag value={option} style={{ background: getPopulationColor(option) }} />
  );
};

export const populationBodyTemplate = (rowData) => {
  return (
    <div>
      {rowData.population.map((population, index) => (
        <Tag
          key={index}
          value={population}
          style={{
            background: getPopulationColor(population),
            width: "5rem",
            height: "3rem",
            fontSize: "0.8rem",
          }}
        />
      ))}
    </div>
  );
};
