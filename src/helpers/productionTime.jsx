import { Calendar } from "primereact/calendar";

export const productionTimeFilterTemplate = (options) => {
    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />;
};

export const productionTimeBodyTemplate = (rowData) => {
    return rowData.productionTime != 'Invalid Date' ? formatDate(rowData.productionTime) : ''
};

const formatDate = (value) => {
    return value.toLocaleDateString('he-IL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

export const productionTimeEditor = (options) => {
    let date;
    if (options.value)
        date = options.value
    else
        date = new Date();
    return <Calendar value={date} onChange={(e) => {
        options.editorCallback(e.value)
    }} dateFormat="dd/mm/yy" placeholder='dd/mm/yy' mask="99/99/9999" />;
}
