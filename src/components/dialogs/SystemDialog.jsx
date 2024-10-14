import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

import {getStatusColor, getFactorableTypeColor, internalImage} from '../../services/consts';
import {getClassificationColor, getEnvironmentColor, getPopulationColor} from '../../services/consts'
import './SystemDialog.css'

export default function SystemDialog(system) {
    system = system.dataSystem;

    const factor = system.internal == null ? {"name" :system.external.name,"image":system.external.image} : 
    {"name" :system.internal.command,"image":internalImage} ;

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" className="md:w-25rem" />
    );

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    
    return (
        <div className="card flex justify-content-center">
            <Card title={system.name} subTitle={system.purpose} header={header} >
                <p>{system.description}</p>
                <div className="flex align-items-center gap-2">
                    <h3>גוף דורש:</h3>
                    <p>{system.requires.command}</p>
                    </div>
                <div className="flex align-items-center gap-2">
                    <h4>איש קשר:</h4>
                    <p>{system.requires.name} | {system.requires.phone} |
                        <a href={'mailto:'+system.requires.email}>{system.requires.email}</a>
                    </p>
                </div>
                <h3>גוף מבצע: &nbsp;<Tag value={system.factorableType} style={{ backgroundColor:getFactorableTypeColor(system.factorableType)}} />
                </h3>
                <div className="flex align-items-center gap-2">
                    <img alt={factor.name} src={window.location.origin + `/images/${factor.image}.png`} width="32" />
                    <span>{factor.name}</span>
                </div>
                <h3>סטטוס: &nbsp;<Tag value={system.status} style={{ backgroundColor:getStatusColor(system.status)}}></Tag></h3>
                <h3>סיווג:  <Tag value={system.classification} style={{ backgroundColor:getClassificationColor(system.classification)}} /></h3>
                <h3>סביבת פיתוח:  <Tag value={system.environment} style={{ backgroundColor: getEnvironmentColor(system.environment) }} /></h3>
                <h3>סוג אוכלוסיה: {system.population.map((population, index) => (
                    <Tag key={index} value={population} severity={getPopulationColor(population)} style={{ margin: "2px" ,backgroundColor:getPopulationColor(population)}} />
                ))}
                </h3>

                <div>
                    {system.productionTime != 'Invalid Date' ? <div>
                        <h3> תאריך עליה לאוויר:</h3 >
                        <p className="m-0">
                            {formatDate(system.productionTime)}
                        </p>
                    </div> : false}
                </div>
            </Card>
        </div>
    )
}
