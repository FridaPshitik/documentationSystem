import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { CustomerService } from '../../services/CustomerService';

import { Calendar } from 'primereact/calendar';

import imageSkyvar from "../assets/skyvar.png";
import imageElbit from "../assets/elbit.png";
import imageInside from "../assets/inside.png";
import e from "../assets/e.png";
import './SystemsTable.css';
import AddProjectForm from '../form/AddProjectForm';
import DialogSystem from '../form/DialogSystem'

export default function SystemsTable() {
    const [customers, setCustomers] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        goal: { value: null, matchMode: FilterMatchMode.CONTAINS },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        type: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [visible, setVisibleAddProjectFormDialog] = useState(false);
    const [visibleSystemDialog, setVisibleSystemDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [representatives] = useState([
        { name: "סקייבר", image: "skyvar.png" },
        { name: "אלביט", image: "elbit.png" },
        { name: "צהל", image: "inside.png" }
    ]);
    const [statuses] = useState(['באפיון', 'בפיתוח', 'בתהליך', 'עלה לאויר']);
    const [types] = useState(['חיצוני', 'פנימי']);

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

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => {
            setCustomers(getCustomers(data));
            setLoading(false);
        });
    }, []);

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="הזן ערך לחיפוש" />
                </IconField>
                <Button id='add_project' icon="pi pi-plus" outlined onClick={() => setVisibleAddProjectFormDialog(true)} />
                <Dialog header="הוספת פרוייקט חדש" visible={visible} onHide={() => { if (!visible) return; setVisibleAddProjectFormDialog(false); }}>
                    <AddProjectForm></AddProjectForm>
                </Dialog>
            </div>
        );
    };

    const representativesItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                {
                    option.name === "סקייבר" ? (
                        <img alt={option.image} src={imageSkyvar} width="32" />
                    ) : option.name === "אלביט" ? (
                        <img alt={option.image} src={imageElbit} width="32" />
                    ) : option.name === "צהל" ? (
                        <img alt={option.image} src={imageInside} width="32" />
                    ) : (
                        <img alt={option.image} src={e} width="32" />
                    )
                }
                <span>{option.name}</span>
            </div>
        );
    };

    // const representativesItemTemplate = (option) => {
    //     return (
    //         <div className="flex align-items-center gap-2">
    //             <img alt={option.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
    //             <span>{option.name}</span>
    //         </div>
    //     );
    // };


    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;
        return (
            <div className="flex align-items-center gap-2">
                {representative.name === "סקייבר" ? (
                    <img alt={representative.image} src={imageSkyvar} width="32" />
                ) : representative.name === "אלביט" ? (
                    <img alt={representative.image} src={imageElbit} width="32" />
                ) : (
                    <img alt={representative.image} src={imageInside} width="32" />
                )}
                <span>{representative.name}</span>
            </div>
        );
    };

    // const representativeBodyTemplate = (rowData) => {
    //     const representative = rowData.representative;

    //     return (
    //         <div className="flex align-items-center gap-2">
    //             <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
    //             <span>{representative.name}</span>
    //         </div>
    //     );
    // };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getStatusSeverity(rowData.status)} />;
    };

    const typeBodyTemplate = (rowData) => {
        return <Tag value={rowData.type} severity={getTypeSeverity(rowData.type)} />;
    };

    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getStatusSeverity(option)} />;
    };

    const typesItemTemplate = (option) => {
        return <Tag value={option} severity={getTypeSeverity(option)} />;
    };

    // const verifiedBodyTemplate = (rowData) => {
    //     return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified })}></i>;
    // };

    const representativeRowFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={representatives}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                optionLabel="value"
                placeholder="חיפוש גוף מבצע"
                className="p-column-filter"
                maxSelectedLabels={1}
                style={{ minWidth: '14rem' }}
            />
        );
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="חיפוש סטטוס" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };

    const typeRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={types} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={typesItemTemplate} placeholder="חיפוש סוג" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };

    const header = renderHeader();

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const dateBodyTemplate = (rowData) => {
        return rowData.date != 'Invalid Date' ? formatDate(rowData.date) : ''
    };

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const onRowEditComplete = (e) => {
        let _products = [...customers];
        let { newData, index } = e;

        _products[index] = newData;

        setCustomers(_products);
    };

    const allowEdit = (rowData) => {
        // return rowData.name !== 'Blue Band';
        return true;
    };

    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="בחר סטטוס"
                itemTemplate={(option) => {
                    return <Tag value={option} severity={getStatusSeverity(option)}></Tag>;
                }}
            />
        );
    };

    const typeEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={types}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="בחר סוג"
                itemTemplate={(option) => {
                    return <Tag value={option} severity={getTypeSeverity(option)}></Tag>;
                }}
            />
        );
    };

    const dateEditor = (options) => {
        // return <InputNumber value={options.value} onValueChange={(e) => options.editorCallback(e.value)} mode="currency" currency="USD" locale="en-US" />;
        return <Calendar value={options.value} onValueChange={(e) => options.options.editorCallback(e.value)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    }

    const [dataSystem, setDataSystem] = useState({})

    const ShowSystemDialog = (rowData) => {
        console.log(rowData);
        setDataSystem(rowData)
        setVisibleSystemDialog(true)
    }

    return (
        <div className="card">
            <DataTable value={customers} paginator editMode="row" rows={10} dataKey="id" onRowEditComplete={onRowEditComplete} filters={filters} filterDisplay="row" loading={loading}
                globalFilterFields={['name', 'goal', 'representative.name', 'status', 'type']} header={header} emptyMessage="No customers found." onRowClick={(e) => ShowSystemDialog(e.data)}>
                <Column field="name" header="שם המערכת" editor={(options) => textEditor(options)} filter filterPlaceholder="חיפוש שם מערכת" style={{ minWidth: '12rem' }} />
                <Column field="goal" header="מטרת המערכת" editor={(options) => textEditor(options)} filter filterPlaceholder="חיפוש מטרת מערכת" style={{ minWidth: '12rem' }} />
                <Column header="גוף מבצע" filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                    body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} />
                <Column field="status" header="סטטוס" editor={(options) => statusEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                <Column header="תאריך עליה לאויר" editor={(options) => dateEditor(options)} filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                <Column field="type" class="column" header="סוג" editor={(options) => typeEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={typeBodyTemplate} filter filterElement={typeRowFilterTemplate} />
                <Column rowEditor={allowEdit} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
            <Dialog visible={visibleSystemDialog} style={{ width: '50vw' }} onHide={() => { if (!visibleSystemDialog) return; setVisibleSystemDialog(false); }}>
                <DialogSystem dataSystem={dataSystem}></DialogSystem>
            </Dialog>
        </div>
    );
}
