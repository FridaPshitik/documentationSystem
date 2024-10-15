import { Card } from "primereact/card";
import { Tag } from "primereact/tag";

import {
  getStatusColor,
  getFactorableTypeColor,
  internalImage,
  statuses,
} from "../../services/consts";
import {
  getClassificationColor,
  getEnvironmentColor,
  getPopulationColor,
} from "../../services/consts";
import "./SystemDialog.css";
import { getExternalImag } from "../../services/ExternalsService";

export default function SystemDialog(system) {
  system = system.dataSystem;

  const factor =
    system.internal == null
      ? { name: system.external.name, image: system.external.image }
      : { name: system.internal.command, image: internalImage };

  const formatDate = (value) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div
      className="card flex justify-content-center"
      style={{ border: "solid black 3px" }}
    >
      <Card title={system.name} subTitle={system.purpose}>
        <p>{system.description}</p>
        <div className="details">
          <div className="flex align-items-center gap-2">
            <h3>גוף דורש:</h3>
            <p>{system.requires.command}</p>
          </div>
          <div className="flex align-items-center gap-2">
            <h3>איש קשר:</h3>
            <p>
              {system.requires.name} | {system.requires.phone} |
              <a href={"mailto:" + system.requires.email}>
                {system.requires.email}
              </a>
            </p>
          </div>
          <div className="flex align-items-center gap-2">
            <h3>גוף מבצע:</h3>
            <Tag
              value={system.factorableType}
              style={{
                backgroundColor: getFactorableTypeColor(system.factorableType),
              }}
            />
            <span> |</span>
            <div className="flex align-items-center gap-2">
              <img
                alt={factor.name}
                src={getExternalImag(factor.image)}
                width="32"
              />
              <span>{factor.name}</span>
            </div>
          </div>
          <div className="flex align-items-center gap-2">
            <h3>סטטוס:</h3>
            <Tag
              value={system.status}
              style={{ backgroundColor: getStatusColor(system.status) }}
            ></Tag>
            <span>
              {system.status === statuses.DONE
                ? "|" + formatDate(system.productionTime)
                : ""}
            </span>
          </div>
          <div className="flex align-items-center gap-2">
            <h3>סיווג:</h3>
            <Tag
              value={system.classification}
              style={{
                backgroundColor: getClassificationColor(system.classification),
              }}
            />
          </div>
          <div className="flex align-items-center gap-2">
            <h3>סביבת פיתוח: </h3>
            <Tag
              value={system.environment}
              style={{
                backgroundColor: getEnvironmentColor(system.environment),
              }}
            />
          </div>
          <div className="flex align-items-center gap-2">
            <h3>סוג אוכלוסיה:</h3>
            {system.population.map((population, index) => (
              <Tag
                key={index}
                value={population}
                severity={getPopulationColor(population)}
                style={{
                  margin: "2px",
                  backgroundColor: getPopulationColor(population),
                }}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
