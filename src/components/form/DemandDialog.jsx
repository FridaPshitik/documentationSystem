import { Card } from 'primereact/card';


export default function DemandDialog(data) {

    return (
        <div className="card flex justify-content-center">
            <Card title={"יצירת קשר"}  >
            <h3> איש הקשר: {data.dataSystem.contactName}</h3>
            <h3> מספר הטלפון: {data.dataSystem.contactPhone}</h3>
            </Card>
        </div>
    )
}
