import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

import './DialogSystem.css'

export default function DialogSystem(data) {

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" className="md:w-25rem" />
    );

    const getStatusSeverity = (status) => {
        switch (status) {
            case 'באפיון':
                return 'danger';

            case 'בפיתוח':
                return 'success';

            case 'בתהליך':
                return 'info';

            case 'עלה לאויר':
                return 'warning';

        }
    };

    const getTypeSeverity = (status) => {
        switch (status) {
            case 'פנימי':
                return 'primary';

            case 'חיצוני':
                return 'warning';

            case '':
                return 'dark';

        }
    };
    const getClassificationSeverity = (classification) => {
        switch (classification) {
            case 'בלמ"ס':
                return 'success';

            case 'סודי':
                return 'warning';

            case 'סודי ביותר':
                return 'danger';
        }
    };

    const getDevEnvironmentSeverity = (devEnvironment) => {
        switch (devEnvironment) {
            case 'אדומה':
                return 'red';

            case 'שחורה':
                return 'black';
        }
    };
    const getPopulationSeverity = (population) => {
        switch (population) {
            case 'חובה':
                return 'danger';
            case 'קבע':
                return 'info';
            case 'מילואים':
                return 'primary';
            case 'אע"צים':
                return 'danger';
            case 'פטור':
                return 'warning';
        }
    };

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    const representative = data.dataSystem.representative;

    return (
        <div className="card flex justify-content-center">
            <Card title={data.dataSystem.name} subTitle={data.dataSystem.goal} header={header} >
                <p>{data.dataSystem.description}</p>
                <div className="flex align-items-center gap-2">
                    <h3>גוף דורש:</h3>
                    <p>{data.dataSystem.demand.section}</p>
                    </div>
                <div className="flex align-items-center gap-2">
                    <h4>איש קשר:</h4>
                    <p>{data.dataSystem.demand.contactName} | {data.dataSystem.demand.contactPhone} |
                    <a href={'mailto:'+data.dataSystem.demand.contactEmail}>{data.dataSystem.demand.contactEmail}</a></p>
                </div>
                <h3>גוף מבצע: &nbsp;<Tag value={data.dataSystem.type} severity={getTypeSeverity(data.dataSystem.type)} />
                </h3>
                <div className="flex align-items-center gap-2">
                    <img alt={representative.name} src={window.location.origin + `/images/${representative.image}`} width="32" />
                    <span>{representative.name}</span>
                </div>
                <h3>סטטוס: &nbsp;<Tag value={data.dataSystem.status} severity={getStatusSeverity(data.dataSystem.status)}></Tag></h3>
                <h3>סיווג:  <Tag value={data.dataSystem.classification} severity={getClassificationSeverity(data.dataSystem.classification)} /></h3>
                <h3>סביבת פיתוח:  <Tag value={data.dataSystem.devEnvironment} style={{ backgroundColor: getDevEnvironmentSeverity(data.dataSystem.devEnvironment) }} /></h3>
                <h3>סוג אוכלוסיה: {data.dataSystem.population.map((population, index) => (
                    <Tag key={index} value={population} severity={getPopulationSeverity(population)} style={{ margin: "2px" }} />
                ))}</h3>

                <div>
                    {data.dataSystem.date != 'Invalid Date' ? <div>
                        < h3 > תאריך עליה לאוויר:</h3 >
                        <p className="m-0">
                            {formatDate(data.dataSystem.date)}
                        </p>
                    </div> : false}
                </div>
            </Card>
        </div>
    )
}
