import { Card } from 'primereact/card';

export default function RequireDialog(data) {
    return (
        <div className="card flex justify-content-center">
            <Card title={" ☎ יצירת קשר"}  >
            <h3> איש הקשר: {data.dataSystem.contact}</h3>
            <h3> מספר הטלפון: {data.dataSystem.phone}</h3>
            <h3> מייל: <a href={'mailto:'+data.dataSystem.email}>{data.dataSystem.email}</a></h3>
            </Card>
        </div>
    )
}
