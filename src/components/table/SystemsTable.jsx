import React, { useContext, useEffect, useRef, useState } from 'react';

import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';

import { getProjects } from '../../services/ProjectService';
import DemandDialog from '../form/dialogs/DemandDialog';
import DialogSystem from '../form/dialogs/DialogSystem';
import './SystemsTable.css';

import { classificationBodyTemplate, classificationEditor, classificationRowFilterTemplate } from '../../helpers/classification';
import { environmentBodyTemplate, environmentEditor, environmentRowFilterTemplate } from '../../helpers/enviroments';
import { externalBodyTemplate, activeEditor, externalRowFilterTemplate } from '../../helpers/external';
import { factorableTypeBodyTemplate, factorableTypeRowFilterTemplate } from '../../helpers/factorableType';
import { populationBodyTemplate, populationRowFilterTemplate } from '../../helpers/population';
import { requireEditor, requireFilterTemplate } from '../../helpers/requires';
import { statusBodyTemplate, statusRowFilterTemplate } from '../../helpers/status';

import { productionTimeBodyTemplate, productionTimeEditor, productionTimeFilterTemplate } from '../../helpers/productionTime';
import { textEditor } from '../../helpers/text';
import { factorableTypes, getStatusColor, statuses } from '../../services/consts';
import { ProjectContext } from '../../services/ProjectContext';
import { AddProject } from '../form/projectForm/AddProject';
import { del, put } from '../../services/axiosInstance';

export default function SystemsTable() {

    const { projects, setProjects } = useContext(ProjectContext)
    const { error, setError } = useContext(ProjectContext)

    let emptyProject = {
        id: null,
        name: '',
        purpose: null,
        description: '',
        external: null,
        status: null,
        productionTime: null,
        factorableType: null,
        classification: null,
        environment: null,
        population: []
    };

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        purpose: { value: null, matchMode: FilterMatchMode.CONTAINS },
        description: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        productionTime: { value: null, matchMode: FilterMatchMode.DATE_IS },
        'requires.command': { value: null, matchMode: FilterMatchMode.IN },
        factorableType: { value: null, matchMode: FilterMatchMode.EQUALS },
        classification: { value: null, matchMode: FilterMatchMode.EQUALS },
        environment: { value: null, matchMode: FilterMatchMode.EQUALS },
        external: { value: null, matchMode: FilterMatchMode.IN },
        population: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [visible, setVisibleAddProjectFormDialog] = useState(false);
    const [editableRows, setEditableRows] = useState({});
    const [visibleSystemDialog, setVisibleSystemDialog] = useState(false);
    const [visibleRequireDialog, setVisibleRequireDialog] = useState(false)
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [deleteProjectDialog, setDeleteProjectDialog] = useState(false);
    const [project, setProject] = useState(emptyProject);
    const [selectedProjects, setSelectedProjects] = useState(null);
    const [requireConcats, setRequireConcats] = useState(null);
    const [dataSystem, setDataSystem] = useState({})
    const toast = useRef(null);
    const dt = useRef(null);


    const renderHeader = () => {
        return (
            <div className="flex justify-content-end headerss" >
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="הזן ערך לחיפוש" />
                </IconField>
                <Dialog header="הוספת מערכת חדשה" id='addNewProjectDialog' visible={visible} onHide={() => { if (!visible) return; setVisibleAddProjectFormDialog(false); }}>
                    <AddProject toast={toast}></AddProject>
                </Dialog>
                <Button id='add_project' label='הוספת מערכת חדשה' icon="pi pi-plus" outlined onClick={() => setVisibleAddProjectFormDialog(true)} />

                <Button id='download' icon="pi pi-download" outlined onClick={exportCSV} />
            </div>
        );
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const openCardBodyTemplate = (rowData) => {
        return <div >
            <IconField style={{ display: "flex", justifyContent: "center" }}>
                <InputIcon className="pi pi-bars p-button p-component p-button-icon-only p-button-outlined p-button-text p-button-rounded" onClick={() => ShowSystemDialog(rowData)} />
            </IconField>
        </div>
    };

    const ShowSystemDialog = (rowData) => {
        setDataSystem(rowData)
        setVisibleSystemDialog(true)
    }

    const requireTemplate = (option) => {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button icon='pi pi-phone' rounded text style={{ color: 'grey' }} onClick={() => {
                    setVisibleRequireDialog(true)
                    setRequireConcats(option.requires)
                }
                } />
                <span > {option.requires.command} </span>
            </div>
        )
    }

    const header = renderHeader();

    const onRowEditInit = (event) => {
        const { status, id } = event.data;

        setEditableRows((prevEditableRows) => ({
            ...prevEditableRows,
            [id]: status === statuses.DONE,
        }));
    };

    const onRowEditComplete = async (e) => {
        let _projects = [...projects];
        let { newData, index } = e;
        if (newData.status === statuses.DONE && newData.productionTime == 'Invalid Date') {
            newData.productionTime = new Date();
        }
        const { external, internal, requires, ...updatedData } = newData;
        if (newData.factorableType === factorableTypes.INTERNAL) {
            newData.internal = newData.external
            updatedData.internalId = newData.external.id
            newData.external = null
        }
        else
            updatedData.externalId = newData.external.id
        await put('project', updatedData.id, updatedData)
        _projects[index] = newData;
        setProjects(_projects);
    };

    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={Object.values(statuses)}
                onChange={(e) => {
                    options.editorCallback(e.value)
                    if (options.rowData.status === statuses.DONE) {
                        setEditableRows((prevEditableRows) => ({
                            ...prevEditableRows,
                            [options.rowData.id]: true,
                        }));
                    }

                }
                }
                placeholder="בחר סטטוס"
                itemTemplate={(option) => {
                    return <Tag value={option} style={{ background: getStatusColor(option) }}></Tag>;
                }}
            />
        );
    };

    const hideDeleteProjectDialog = () => {
        setDeleteProjectDialog(false);
    };

    const deleteBodyTemplate = (rowData) => {
        return <Button icon="pi pi-trash" rounded text outlined style={{ color: 'grey' }} onClick={() => confirmDeleteProject(rowData)} />;
    };

    const confirmDeleteProject = (project) => {
        setProject(project);
        setDeleteProjectDialog(true);
    };

    const deleteProject = () => {
        let _projects = projects.filter((val) => val.id !== project.id);
        del('project', project.id);
        setProjects(_projects);
        setDeleteProjectDialog(false);//
        setProject(emptyProject);//
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'המערכת נמחקה בהצלחה', life: 3000 });
    };

    useEffect(() => {
        const fetchData = async () => {
            let getProject = await getProjects();
            if (getProject.status == 200) {
                setError(null);
                setProjects(convertDate(getProject.data));
                setLoading(false);
            }
            else {
                setError(getProject.message);
            }
        }
        fetchData();
    }, []);

    const convertDate = (data) => {
        return [...(data || [])].map((d) => {
            d.productionTime = new Date(d.productionTime);
            return d;
        });
    };

    return <>
        <div>
            <Toast ref={toast} position='top-left' />
            <div className="card">
                <div style={{ textAlign: 'center' }}>
                    <img alt="סקייבר" src={window.location.origin + '/images/skyvar.png'} width="32" style={{ position: 'relative', marginBottom: '-1em' }} />
                    <span style={{ fontWeight: 'bold', fontSize: '2em' }}> תיעוד </span>
                    <h3 id='titleH3'>תצוגת מערכות מידע</h3>
                </div>
                <DataTable ref={dt} value={projects} paginator editMode="row" rows={10} dataKey="id" onRowEditComplete={onRowEditComplete} onRowEditInit={onRowEditInit} filters={filters} filterDisplay="row" loading={loading} scrollable
                    selectionMode={'checkbox'} selection={selectedProjects} onSelectionChange={(e) => setSelectedProjects(e.value)}
                    globalFilterFields={['name', 'purpose', 'description', 'status', 'productionTime', 'requires.command', 'factorableType', 'external.name', 'population', 'classification', 'environment']} header={header} emptyMessage="אין מערכות להציג" >
                    <Column style={{ minWidth: '5rem' }} body={openCardBodyTemplate} />
                    <Column field="name" header="שם המערכת" editor={(options) => textEditor(options)} sortable filter filterPlaceholder="חפש" style={{ minWidth: '15rem' }} />
                    <Column field="purpose" header="מטרת המערכת" editor={(options) => textEditor(options)} sortable filter filterPlaceholder="חפש" style={{ minWidth: '15rem' }} />
                    <Column field='requires.command' header="גוף דורש" editor={(options) => requireEditor(options)} style={{ minWidth: '8rem' }} filter filterField='requires.command' showFilterMenu={false} filterPlaceholder="חיפוש גוף דורש" body={requireTemplate} filterElement={requireFilterTemplate} />
                    <Column field='population' header="סוג אוכלוסיה" showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={populationBodyTemplate} filter filterElement={populationRowFilterTemplate} />
                    <Column field='classification' header="סיווג" editor={(options) => classificationEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={classificationBodyTemplate} filter filterElement={classificationRowFilterTemplate} />
                    <Column field='environment' header="סביבת פיתוח" editor={(options) => environmentEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={environmentBodyTemplate} filter filterElement={environmentRowFilterTemplate} />
                    <Column field="factorableType" class="column" header="פיתוח" showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '8rem' }} body={factorableTypeBodyTemplate} filter filterElement={factorableTypeRowFilterTemplate} />
                    <Column field="external" header="גוף מבצע" editor={(options) => activeEditor(options)} filterField="external" showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '8rem' }} body={externalBodyTemplate} filter filterElement={externalRowFilterTemplate} />
                    <Column field="status" header="סטטוס" editor={(options) => statusEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
                    <Column filterField='productionTime' dataType="date" header="תאריך עליה לאויר" sortable editor={(options) => editableRows[options.rowData.id] ? productionTimeEditor(options) : null} style={{ minWidth: '15rem' }} body={productionTimeBodyTemplate} filter filterElement={productionTimeFilterTemplate} />
                    <Column rowEditor={true} style={{ minWidth: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
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

                <Dialog visible={visibleSystemDialog} style={{ width: '50vw' }} onHide={() => { if (!visibleSystemDialog) return; setVisibleSystemDialog(false); }}>
                    <DialogSystem dataSystem={dataSystem}></DialogSystem>
                </Dialog>

                <Dialog visible={visibleRequireDialog} onHide={() => { if (!visibleRequireDialog) return; setVisibleRequireDialog(false) }}>
                    <DemandDialog dataSystem={requireConcats}></DemandDialog>
                </Dialog>
                {error !== null ? <>{toast.current.show({ severity: 'error', summary: 'Error', detail: error, sticky: true })}</> : <span></span>}
            </div>
        </div>

    </>;
}
