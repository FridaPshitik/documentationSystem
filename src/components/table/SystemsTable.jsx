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
        description: '',
        goal: null,
        representative: null,
        status: null,
        date: null,
        type: null,
        classification: null,
        devEnvironment: null,
        population: []
    };

    const [projects, setProjects] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        goal: { value: null, matchMode: FilterMatchMode.CONTAINS },
        description: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        date: { value: null, matchMode: FilterMatchMode.DATE_IS },
        'demand.section': { value: null, matchMode: FilterMatchMode.IN },
        type: { value: null, matchMode: FilterMatchMode.EQUALS },
        classification: { value: null, matchMode: FilterMatchMode.EQUALS },
        devEnvironment: { value: null, matchMode: FilterMatchMode.EQUALS },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        population: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [visible, setVisibleAddProjectFormDialog] = useState(false);
    // const [isDateEditable, setIsDateEditable] = useState(false);
    const [editableRows, setEditableRows] = useState({});
    const [visibleSystemDialog, setVisibleSystemDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [representatives] = useState([
        { name: "סקייבר", image: "skyvar.png" },
        { name: "אלביט", image: "elbit.png" },
        { name: "צהל", image: "inside.png" }
    ]); // פונקציה לשליפת הגופים המבצעים מהטבלה
    const [demands] = useState([
        'פיקוד צפון',
        'פיקוד דרום'
    ]) // פונקציה לשליפת הגופים הדורשים מהטבלה
    const [statuses] = useState(['באפיון', 'בפיתוח', 'בתהליך', 'עלה לאויר']); // פונקציה לשליפת הסטטוסים מהטבלה
    const [types] = useState(['חיצוני', 'פנימי']); // פונקציה לשליפת הסוגים מהטבלה
    const [classification] = useState(['סודי ביותר', 'סודי', 'בלמ"ס']);
    const [devEnvironment] = useState(['שחורה', 'אדומה']);
    const [population] = useState(['פטור', 'אע"צים', 'מילואים', 'קבע', 'חובה'])
    const [deleteProjectDialog, setDeleteProjectDialog] = useState(false);
    // const [deleteProjectsDialog, setDeleteProjectsDialog] = useState(false);
    const [project, setProject] = useState(emptyProject);
    const [selectedProjects, setSelectedProjects] = useState(null);
    const [selectedReresentative, setSelectedRepresentative] = useState(null);
    const [dataSystem, setDataSystem] = useState({})
    const toast = useRef(null);
    const dt = useRef(null);

    const getStatusSeverity = (status) => {
        switch (status) {
            case 'באפיון':
                return 'danger';

            case 'בפיתוח':
                return 'warning';

            case 'בתהליך':
                return 'info';

            case 'עלה לאויר':
                return 'success';
        }
    };

    const getTypeSeverity = (type) => {
        switch (type) {
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

    const getDevEnvironmentColor = (devEnvironment) => {
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

    // const confirmDeleteSelected = () => {
    //     setDeleteProjectsDialog(true);
    // };

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
                <Dialog header="הוספת פרוייקט חדש" id='addNewProjectDialog' visible={visible} onHide={() => { if (!visible) return; setVisibleAddProjectFormDialog(false); }}>
                    <AddProjectForm></AddProjectForm>
                </Dialog>
                <Button id='add_project' label='הוספת פרוייקט חדש' icon="pi pi-plus" outlined onClick={() => setVisibleAddProjectFormDialog(true)} />

                {/* <Button id='delete_selected' icon="pi pi-trash" severity="danger" outlined onClick={confirmDeleteSelected} disabled={!selectedProjects || !selectedProjects.length} /> */}
                <Button id='download' icon="pi pi-download" outlined onClick={exportCSV} />
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

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;
        return (<div className="flex align-items-center gap-2">
            <img alt={representative.name} src={window.location.origin + `/images/${representative.image}`} width="32" />
            <p>{representative.name}</p>
        </div>);
    };

    const openCardBodyTemplate = (rowData) => {
        return <div >
            <IconField style={{display:"flex",justifyContent:"center"}}>
                <InputIcon className="pi pi-bars p-button p-component p-button-icon-only p-button-outlined p-button-text p-button-rounded" onClick={() => ShowSystemDialog(rowData)} />
            </IconField>
        </div>
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getStatusSeverity(rowData.status)} style={{ width: "5rem", height: "3rem", fontSize: "0.8rem" }} />;
    };

    const typeBodyTemplate = (rowData) => {
        return <Tag value={rowData.type} severity={getTypeSeverity(rowData.type)} style={{ width: "5rem", height: "3rem", fontSize: "0.8rem" }} />;
    };

    const classificationBodyTemplate = (rowData) => {
        return <Tag value={rowData.classification} severity={getClassificationSeverity(rowData.classification)} style={{ width: "5rem", height: "3rem", fontSize: "0.8rem" }} />;
    };

    const devEnvironmentBodyTemplate = (rowData) => {
        return <Tag value={rowData.devEnvironment}  style={{background : getDevEnvironmentColor(rowData.devEnvironment), width: "5rem", height: "3rem", fontSize: "0.8rem" }} />;
    };

    const populationBodyTemplate = (rowData) => {
        return <div>
            {rowData.population.map((population, index) => (
                <Tag key={index} value={population} severity={getPopulationSeverity(population)} style={{ width: "5rem", height: "3rem", fontSize: "0.8rem" }} />
            ))}
        </div>
    };

    const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getStatusSeverity(option)} />;
    };

    const typesItemTemplate = (option) => {
        return <Tag value={option} severity={getTypeSeverity(option)} />;
    };

    const classificationItemTemplate = (option) => {
        return <Tag value={option} severity={getClassificationSeverity(option)} />;
    };

    const devEnvironmentItemTemplate = (option) => {
        return <Tag value={option} style={{background:getDevEnvironmentColor(option)}} />;
    };

    const populationItemTemplate = (option) => {
        return <Tag value={option} severity={getPopulationSeverity(option)} />;
    };

    const demandItemTemplate = (option) => {
        return (
            <p>{option}</p>
        )
    }

    const representativeRowFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={representatives}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                placeholder="סנן"
                className="p-column-filter"
            />
        );
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="סנן" className="p-column-filter" />
        );
    };

    const typeRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={types} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={typesItemTemplate} placeholder="סנן" className="p-column-filter" />
        );
    };

    const classificationRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={classification} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={classificationItemTemplate} placeholder="סנן" className="p-column-filter" />
        );
    };

    const devEnvironmentRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={devEnvironment} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={devEnvironmentItemTemplate} placeholder="סנן" className="p-column-filter" />
        );
    };

    const populationRowFilterTemplate = (options) => {
        // return (
        //     <Dropdown value={options.value} options={population} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={populationItemTemplate} placeholder="חיפוש סוג אוכלוסיה" className="p-column-filter" />
        // );
        return (
            <MultiSelect
                value={options.value}
                options={population}
                itemTemplate={populationItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                optionLabel="name"
                placeholder="סנן"
                className="p-column-filter"
            />
        );
    }

    const header = renderHeader();

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" />;
    };

    const demandFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value}
                options={demands}
                itemTemplate={demandItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder='סנן'
                className="p-column-filter"
            />
        )
    }

    const dateBodyTemplate = (rowData) => {
        return rowData.date != 'Invalid Date' ? formatDate(rowData.date) : ''
    };

    const formatDate = (value) => {
        return value.toLocaleDateString('he-IL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const onRowEditInit = (event) => {
        const { status, id } = event.data;

        setEditableRows((prevEditableRows) => ({
            ...prevEditableRows,
            [id]: status === "עלה לאויר",
        }));
    };


    const onRowEditComplete = (e) => {
        let _projects = [...projects];
        let { newData, index } = e;
        if (newData.status == "עלה לאויר" && newData.date == 'Invalid Date') {
            newData.date = new Date();
        }
        _projects[index] = newData;
        setProjects(_projects);
    };

    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => {
                    options.editorCallback(e.value)
                    if (options.rowData.status === 'עלה לאויר') {
                        setEditableRows((prevEditableRows) => ({
                            ...prevEditableRows,
                            [options.rowData.id]: true,
                        }));
                    }

                }
                }
                placeholder="בחר סטטוס"
                itemTemplate={(option) => {
                    return <Tag value={option} severity={getStatusSeverity(option)}></Tag>;
                }}
            />
        );
    };

    const demandEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={demands}
                itemTemplate={demandItemTemplate}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder='בחר גוף דורש'
                className="p-column-filter"
            />
        );
    }

    const representativeEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={representatives}
                itemTemplate={representativesItemTemplate}
                onChange={(e) => options.editorCallback(e.value)}
                optionLabel='name'
                placeholder={options.value.name}
                className="p-column-filter"
            />
        );
    }

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

    const classificationEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={classification}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="בחר סוג סיווג"
                itemTemplate={(option) => {
                    return <Tag value={option} severity={getClassificationSeverity(option)}></Tag>;
                }}
            />
        );
    };

    const devEnvironmentEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={devEnvironment}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="בחר סביבת פיתוח"
                itemTemplate={(option) => {
                    return <Tag value={option} style={{background:getDevEnvironmentColor(option)}}></Tag>;
                }}
            />
        );
    };

    const dateEditor = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.editorCallback(e.value)} dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999" />;
    }

    const hideDeleteProjectDialog = () => {
        setDeleteProjectDialog(false);
    };

    // const hideDeleteProjectsDialog = () => {
    //     setDeleteProjectsDialog(false);
    // };

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

    // const deleteSelectedProjects = () => {
    //     let _projects = projects.filter((val) => !selectedProjects.includes(val));

    //     setProjects(_projects);
    //     setDeleteProjectsDialog(false);
    //     setSelectedProjects(null);
    //     toast.current.show({ severity: 'success', summary: 'Successful', detail: ' הפרויקטים המסומנים נמחקו בהצלחה', life: 3000 });
    // };

    const deleteBodyTemplate = (rowData) => {
        return <Button icon="pi pi-trash" rounded text outlined style={{ color: 'grey' }} onClick={() => confirmDeleteProject(rowData)} />;
    };

    const ShowSystemDialog = (rowData) => {
        console.log(rowData);
        setDataSystem(rowData)
        setVisibleSystemDialog(true)
    }

    useEffect(() => {
        CustomerService.getCustomersMedium().then((data) => {
            setProjects(getProjects(data));
            setLoading(false);
        });
    }, []);

    return (<div>
        <Toast ref={toast} />
        <div className="card">

            <DataTable ref={dt} value={projects} paginator editMode="row" rows={10} dataKey="id" onRowEditComplete={onRowEditComplete} filters={filters} filterDisplay="row" loading={loading} scrollable
                selectionMode={'checkbox'} selection={selectedProjects} onSelectionChange={(e) => setSelectedProjects(e.value)}
                globalFilterFields={['name', 'goal', 'description', 'status', 'date', 'demand.section', 'type', 'representative']} header={header} emptyMessage="No customers found." >
                <Column style={{ minWidth: '5rem' }} body={openCardBodyTemplate} />
                {/* <Column selectionMode="multiple" exportable={false}></Column> */}
                <Column field="name" header="שם המערכת" editor={(options) => textEditor(options)} sortable filter filterPlaceholder="חפש" style={{ minWidth: '15rem' }} />
                <Column field="goal" header="מטרת המערכת" editor={(options) => textEditor(options)} sortable filter filterPlaceholder="חפש" style={{ minWidth: '15rem' }} />
                <Column field="status" header="סטטוס" editor={(options) => statusEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                <Column field='date' dataType="date" header="תאריך עליה לאויר" sortable editor={(options) => editableRows[options.rowData.id] ? dateEditor(options) : null} filterField="date" showFilterMenu={false} style={{ minWidth: '15rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                <Column field='demand.section' header="גוף דורש" editor={(options) => demandEditor(options)} style={{ minWidth: '8rem' }} filter filterField='demand.section' showFilterMenu={false} filterPlaceholder="חיפוש גוף דורש"
                    filterElement={demandFilterTemplate}
                />
                <Column field="type" class="column" header="פיתוח" editor={(options) => typeEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '8rem' }} body={typeBodyTemplate} filter filterElement={typeRowFilterTemplate} />
                <Column field="representative" header="גוף מבצע" editor={(options) => representativeEditor(options)} filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '8rem' }}
                    body={representativeBodyTemplate} filter filterElement={representativeRowFilterTemplate} />
                <Column field='classification' header="סיווג" editor={(options) => classificationEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={classificationBodyTemplate} filter filterElement={classificationRowFilterTemplate} />
                <Column field='devEnvironment' header="סביבת פיתוח" editor={(options) => devEnvironmentEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={devEnvironmentBodyTemplate} filter filterElement={devEnvironmentRowFilterTemplate} />
                <Column field='population' header="סוג אוכלוסיה" showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={populationBodyTemplate} filter filterElement={populationRowFilterTemplate} />
                <Column rowEditor={true} style={{ minWidth: '1rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column body={deleteBodyTemplate} style={{ minWidth: '1rem' }}></Column>
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

            {/* <Dialog visible={deleteProjectsDialog} style={{ width: '22%' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="אזהרה!" modal onHide={hideDeleteProjectsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem', paddingLeft: '1rem' }} />
                    {project && <span>האם למחוק את הפרויקטים המסומנים?</span>}
                    <div style={{ direction: "ltr", marginTop: "10px", marginLeft: '5px' }} >
                        <Button icon="pi pi-times" outlined text onClick={hideDeleteProjectsDialog} />
                        <Button icon="pi pi-check" outlined text severity="danger" onClick={deleteSelectedProjects} />
                    </div>
                </div>
            </Dialog> */}
            <Dialog visible={visibleSystemDialog} style={{ width: '50vw' }} onHide={() => { if (!visibleSystemDialog) return; setVisibleSystemDialog(false); }}>
                <DialogSystem dataSystem={dataSystem}></DialogSystem>
            </Dialog>
        </div>
    </div>);
}
