import React, { useState, useEffect, useRef } from 'react';
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
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';

import './SystemsTable.css';
import AddProjectForm from '../form/AddProjectForm';
import DialogSystem from '../form/DialogSystem'

export default function SystemsTable() {

    let emptyProject = {
        id: null,
        name: '',
        goal: null,
        representative: null,
        status: null,
        date: null,
        type: null,
    };

    const [projects, setProjects] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        goal: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'demand.section': { value: null, matchMode: FilterMatchMode.IN },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
        representative: { value: null, matchMode: FilterMatchMode.IN }
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
    const [demands] = useState([
        'פיקוד צפון',
        'פיקוד דרום'
    ])
    const [statuses] = useState(['באפיון', 'בפיתוח', 'בתהליך', 'עלה לאויר']);
    const [types] = useState(['חיצוני', 'פנימי']);
    const [deleteProjectDialog, setDeleteProjectDialog] = useState(false);
    const [deleteProjectsDialog, setDeleteProjectsDialog] = useState(false);
    const [project, setProject] = useState(emptyProject);
    const [selectedProjects, setSelectedProjects] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

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
            setProjects(getProjects(data));
            setLoading(false);
        });
    }, []);

    const getProjects = (data) => {
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

    const confirmDeleteSelected = () => {
        setDeleteProjectsDialog(true);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="הזן ערך לחיפוש" />
                </IconField>
                <Dialog header="הוספת פרוייקט חדש" visible={visible} onHide={() => { if (!visible) return; setVisibleAddProjectFormDialog(false); }}>
                    <AddProjectForm></AddProjectForm>
                </Dialog>
                {/* <Button id='delete_selected' icon="pi pi-trash" severity="danger" outlined onClick={confirmDeleteSelected} disabled={!selectedProjects || !selectedProjects.length} /> */}
                <Button id='download' style={{ width: '5%' }} icon="pi pi-download" outlined onClick={exportCSV} />
                <Button style={{ width: '20%' }} label='הוספת פרוייקט חדש' id='add_project' icon="pi pi-plus" onClick={() => setVisibleAddProjectFormDialog(true)} />
            </div>
        );
    };


    const representativesItemTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={option.name} src={window.location.origin + `/images/${option.image}`} width="32" />
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
                <img alt={representative.name} src={window.location.origin + `/images/${representative.image}`} width="32" />
                <p>{representative.name}</p>

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

    const openCardBodyTemplate = (rowData) => {
        return <div >
            <IconField>
                <InputIcon className="pi pi-bars p-button p-component p-button-icon-only p-button-outlined p-button-text p-button-rounded" onClick={() => ShowSystemDialog(rowData)} />
            </IconField>
        </div>
    };

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

    const demandItemTemplate = (option) => {
        return (
            <p>{option}</p>
        )
    }
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
                optionLabel="name"
                placeholder="חיפוש גוף מבצע"
                className="p-column-filter"
                // maxSelectedLabels={1}
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
            <Dropdown value={options.value} options={types} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={typesItemTemplate} placeholder="חיפוש סוג פיתוח" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
        );
    };

    const header = renderHeader();

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999" />;
    };

    const demandFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={demands}
                itemTemplate={demandItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder='חיפוש גוף דורש'
                className="p-column-filter"
            />
        )
    }
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
        let _projects = [...projects];
        let { newData, index } = e;
        newData.date = newData.status == 'עלה לאויר' ? new Date() : 'Invalid Date'
        _projects[index] = newData;
        setProjects(_projects);
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
        if (options.rowData.status == 'עלה לאויר') {
            return <Calendar value={options.value} onValueChange={(e) => options.options.editorCallback(e.value)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999" />;
        }
    }

    const hideDeleteProjectDialog = () => {
        setDeleteProjectDialog(false);
    };

    const hideDeleteProjectsDialog = () => {
        setDeleteProjectsDialog(false);
    };


    const confirmDeleteProject = (customer) => {
        setProject(customer);
        setDeleteProjectDialog(true);
    };

    const deleteProject = () => {
        let _projects = projects.filter((val) => val.id !== project.id);

        setProjects(_projects);
        setDeleteProjectDialog(false);
        setProject(emptyProject);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'הפרויקט נמחק בהצלחה', life: 3000 });
    };

    const deleteSelectedProjects = () => {
        let _projects = projects.filter((val) => !selectedProjects.includes(val));

        setProjects(_projects);
        setDeleteProjectsDialog(false);
        setSelectedProjects(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: ' הפרויקטים המסומנים נמחקו בהצלחה', life: 3000 });
    };

    const deleteBodyTemplate = (rowData) => {
        return <Button icon="pi pi-trash" rounded text outlined style={{ color: 'grey' }} onClick={() => confirmDeleteProject(rowData)} />;
    };

    const [dataSystem, setDataSystem] = useState({})

    const ShowSystemDialog = (rowData) => {
        console.log(rowData);
        setDataSystem(rowData)
        setVisibleSystemDialog(true)
    }

    return (<div>
        <Toast ref={toast} />
        <div className="card">
            <DataTable ref={dt} value={projects} paginator editMode="row" rows={10} dataKey="id" onRowEditComplete={onRowEditComplete} filters={filters} filterDisplay="row" loading={loading}
                // selection={selectedProjects} onSelectionChange={(e) => setSelectedProjects(e.value)}
                globalFilterFields={['name', 'goal', 'status', 'date', 'demand.section', 'type', 'representative']} header={header} emptyMessage="No customers found." >
                {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                <Column style={{ minWidth: '5rem' }} body={openCardBodyTemplate} />
                <Column field="name" header="שם המערכת" editor={(options) => textEditor(options)} sortable filter filterPlaceholder="חיפוש שם מערכת" style={{ minWidth: '15rem' }} />
                <Column field="goal" header="מטרת המערכת" editor={(options) => textEditor(options)} sortable filter filterPlaceholder="חיפוש מטרת מערכת" style={{ minWidth: '15rem' }} />
                <Column field="status" header="סטטוס" editor={(options) => statusEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                <Column field='date' header="תאריך עליה לאויר" sortable editor={(options) => dateEditor(options)} filterField="date" dataType="date" style={{ minWidth: '15rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                <Column field='demand.section' header="גוף דורש" style={{ minWidth: '12rem' }} filter filterField='demand.section' showFilterMenu={false} filterPlaceholder="חיפוש גוף דורש"
                    filterElement={demandFilterTemplate}
                />
                <Column field="type" class="column" header="פיתוח" editor={(options) => typeEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={typeBodyTemplate} filter filterElement={typeRowFilterTemplate} />
                <Column field='representative' header="גוף מבצע" filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '10rem' }} style={{ minWidth: '14rem' }}
                    body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} />
                <Column rowEditor={allowEdit} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column body={deleteBodyTemplate} style={{ minWidth: '6rem' }}></Column>
            </DataTable>

            <Dialog visible={deleteProjectDialog} style={{ width: '20%' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="אזהרה!" modal onHide={hideDeleteProjectDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', paddingLeft: '1rem' }} />
                    {project && (<span>האם למחוק <b>{project.name}</b>?</span>
                    )}
                    <div style={{ direction: "ltr", marginTop: "10px", marginLeft: '5px' }} >
                        <Button icon="pi pi-times" outlined text onClick={hideDeleteProjectDialog} />
                        <Button icon="pi pi-check" outlined text severity="danger" onClick={deleteProject} />
                    </div>

                </div>
            </Dialog>

            <Dialog visible={deleteProjectsDialog} style={{ width: '22%' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="אזהרה!" modal onHide={hideDeleteProjectsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', paddingLeft: '1rem' }} />
                    {project && <span>האם למחוק את הפרויקטים המסומנים?</span>}
                    <div style={{ direction: "ltr", marginTop: "10px", marginLeft: '5px' }} >
                        <Button icon="pi pi-times" outlined text onClick={hideDeleteProjectsDialog} />
                        <Button icon="pi pi-check" outlined text severity="danger" onClick={deleteSelectedProjects} />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={visibleSystemDialog} style={{ width: '50vw' }} onHide={() => { if (!visibleSystemDialog) return; setVisibleSystemDialog(false); }}>
                <DialogSystem dataSystem={dataSystem}></DialogSystem>
            </Dialog>
        </div>
    </div>);
}
