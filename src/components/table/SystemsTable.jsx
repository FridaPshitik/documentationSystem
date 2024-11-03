import React, { useEffect, useRef, useState } from 'react';

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

import { classificationBodyTemplate, classificationEditor, classificationRowFilterTemplate } from '../../helpers/classification';
import { productionTimeBodyTemplate, productionTimeEditor, productionTimeFilterTemplate } from '../../helpers/productionTime';
import { environmentBodyTemplate, environmentEditor, environmentRowFilterTemplate } from '../../helpers/enviroments';
import { populationBodyTemplate, populationEditor, populationRowFilterTemplate } from '../../helpers/population';
import { factorableTypeBodyTemplate, factorableTypeRowFilterTemplate } from '../../helpers/factorableType';
import { performBody, performBodyTemplate } from '../../helpers/perform';
import { statusBodyTemplate, statusRowFilterTemplate } from '../../helpers/status';
import { textEditor } from '../../helpers/text';

import { factorableTypes, getStatusColor, internalImage, statuses } from '../../services/consts';
import { ProjectContext } from '../../services/ProjectContext';
import { deleteProject, getProjects, updateProject } from '../../services/ProjectService';

import { AddProject } from '../form/AddProject';
import RequireDialog from '../dialogs/RequireDialog';
import { SystemDialog } from '../dialogs/SystemDialog';
import './SystemsTable.css';
import { displayToast } from '../../services/toast';
import { getExternals, getExternalsNameImage } from '../../services/ExternalsService';
import { getInternals, getInternalsArray, getInternalsNameImage } from '../../services/InternalService';
import { externalItemTemplate } from '../../helpers/external';
import { internalItemTemplate } from '../../helpers/internal';
import { MultiSelect } from 'primereact/multiselect';
import { DeleteDialog } from '../dialogs/DeleteDialog';

export default function SystemsTable() {

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  const [externals, setExternals] = useState([]);
  const [internals, setInternals] = useState([]);

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
    perform: { value: null, matchMode: FilterMatchMode.IN },
    population: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  const [visible, setVisibleAddProjectFormDialog] = useState(false);
  const [editableRows, setEditableRows] = useState({});
  const [visibleSystemDialog, setVisibleSystemDialog] = useState(false);
  const [visibleRequireDialog, setVisibleRequireDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [deleteProjectDialog, setDeleteProjectDialog] = useState(false);
  const [project, setProject] = useState(emptyProject);
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [requireConcats, setRequireConcats] = useState(null);
  const [dataSystem, setDataSystem] = useState({});
  const toast = useRef(null);
  const dt = useRef(null);

  const renderHeader = () => {
    return (
      <div className='flex justify-content-end headerss' >
        <IconField iconPosition='left'>
          <InputIcon className='pi pi-search' />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder='הזן ערך לחיפוש' />
        </IconField>
        <Dialog header='הוספת מערכת חדשה' id='addNewProjectDialog' visible={visible} onHide={() => { if (!visible) return; setVisibleAddProjectFormDialog(false); }}>
          <AddProject toast={toast} hide={setVisibleAddProjectFormDialog}></AddProject>
        </Dialog>
        <Button id='add_project' label='הוספת מערכת חדשה' icon='pi pi-plus' outlined onClick={() => setVisibleAddProjectFormDialog(true)} />

        <Button id='download' icon='pi pi-download' outlined onClick={exportCSV} />
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
    dt.current.props.value.map((item => { 
      item.requires = item.requires['name'];
      item.perform = item.perform['name'];
      item.productionTime = item.productionTime == 'Invalid Date' ? '' : item.productionTime;
    }));
    dt.current.exportCSV();
  };

  const openCardBodyTemplate = (rowData) => {
    return <div >
      <IconField style={{ display: 'flex', justifyContent: 'center' }}>
        <InputIcon className='pi pi-bars p-button p-component p-button-icon-only p-button-outlined p-button-text p-button-rounded' onClick={() => ShowSystemDialog(rowData)} />
      </IconField>
    </div>;
  };

  const ShowSystemDialog = (rowData) => {
    setDataSystem(rowData);
    setVisibleSystemDialog(true);
  };

  const requireTemplate = (option) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button icon='pi pi-phone' rounded text style={{ color: 'grey' }} onClick={() => {
          setVisibleRequireDialog(true);
          setRequireConcats(option.requires);
        }
        } />
        <span > {option.requires.command} </span>
      </div>
    );
  };

  const header = renderHeader();

  const onRowEditInit = (event) => {
    const { status, id } = event.data;

    setEditableRows((prevEditableRows) => ({
      ...prevEditableRows,
      [id]: status === statuses.DONE,
    }));
  };

  const onRowEditComplete = async (event) => {
    let _projects = [...projects];
    let _displayProjects = [...displayProjects];
    let { newData, index } = event;

    if (newData.status === statuses.DONE && newData.productionTime == 'Invalid Date') {
      newData.productionTime = new Date();
    }
    const { perform, external, internal, requires, ...updatedData } = newData;
    let displayData = addPerform(newData);

    const res = await updateProject(updatedData.id, updatedData);
    if (res.data) {
      displayToast(toast, 'success', 'Success', res.data.name + ' עודכן בהצלחה');
      _projects[index] = newData;
      _displayProjects[index] = displayData;
    }

    else if (res.response.data.error) {
      displayToast(toast, 'error', 'Error', res.response.data.error);
    }

    setProjects(_projects);
    setDisplayProjects(_displayProjects);
  };

  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={Object.values(statuses)}
        onChange={(e) => {
          options.editorCallback(e.value);
          if (options.rowData.status === statuses.DONE) {
            setEditableRows((prevEditableRows) => ({
              ...prevEditableRows,
              [options.rowData.id]: true,
            }));
          }
          else options.rowData.productionTime = new Date('');
        }
        }
        placeholder='בחר סטטוס'
        itemTemplate={(option) => {
          return <Tag value={option} style={{ background: getStatusColor(option) }}></Tag>;
        }}
      />
    );
  };

  const deleteBodyTemplate = (rowData) => {
    return <Button icon='pi pi-trash' rounded text outlined style={{ color: 'grey' }} onClick={() => deleteProjectButton(rowData)} />;
  };

  const deleteProjectButton = (project) => {
    setProject(project);
    setDeleteProjectDialog(true);
  };

  const hideDeleteProjectDialog = () => {
    setDeleteProjectDialog(false);
  };

  const confirmDelete = async () => {
    const _projects = projects.filter((val) => val.id !== project.id);
    const _displayProjects = displayProjects.filter((val) => val.id !== project.id);

    const res = await deleteProject(project.id);
    if (res.data) {
      displayToast(toast, 'success', 'Success', res.data.name + ' נמחק בהצלחה');
      setProjects(_projects);
      setDisplayProjects(_displayProjects);
    }
    else if (res.response.data.error) {
      displayToast(toast, 'error', 'Error', res.response.data.error);
    }

    setDeleteProjectDialog(false);
    setProject(emptyProject);
  };
    

  useEffect(() => {
    const fetchData = async () => {
      console.log('hhhhhhhhhhhh');
      let getProject = await getProjects();
      let externals = await getExternals();
      let internals = await getInternals();
      
      externals.status === 200 ? setExternals(externals.data) : displayToast(toast, 'error', 'Error', externals.message );
      internals.status === 200 ? setInternals(internals.data) : displayToast(toast, 'error', 'Error', internals.message );
      let interval;
      if (getProject.status == 200) {
        clearInterval(interval);
        setProjects(convertDate(getProject.data));
        setDisplayProjects(convertDate(getProject.data).map(obj =>addPerform(obj) ));
        setLoading(false);
      }
      else{
        displayToast(toast, 'error', 'Error', getProject.message );
        interval = setInterval(fetchData, 10000);
      } 
    };
    fetchData();
    const myInterval = setInterval(fetchData, 1000 * 60 * 24 * process.env.REACT_APP_REFRESH_TIME);
    return () => clearInterval(myInterval);  }, []);

  const addPerform = (obj) => {
    if (obj.internal)
      return { ...obj, perform: { name: obj.internal.command, image: internalImage } };
    else if (obj.external)
      return { ...obj, perform: { name: obj.external.name, image: obj.external.image } };
  };

  const convertDate = (data) => {
    return [...(data || [])].map((d) => {
      d.productionTime = new Date(d.productionTime ? d.productionTime : '');
      return d;
    });
  };
  // perform-helper
  const performEditor = (options) => {
    if (options.rowData.factorableType === factorableTypes.EXTERNAL)
      return externalEditor(options);
    return internalEditor(options);
  };

  const externalEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={externals}
        itemTemplate={externalItemTemplate}
        onChange={(e) => {
          options.editorCallback(e.value);
          options.rowData.external = e.value;
          options.rowData.externalId = e.value.id;
        }}
        optionLabel='name'
        placeholder={options.value.name}
        className='p-column-filter'
      />
    );
  };

  const internalEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={internals}
        itemTemplate={internalItemTemplate}
        onChange={(e) => {
          options.editorCallback(e.value);
          options.rowData.internal = e.value;
          options.rowData.internalId = e.value.id;
        }}
        optionLabel='command'
        placeholder={options.rowData.internal.command}
        className='p-column-filter'
      />
    );
  };

  const getPerforms = () => {
    try {
      let exter = getExternalsNameImage(externals);
      let inter = getInternalsNameImage(internals);
      let externalPerform = projects.filter(item => item.external).map(item => item.external.name);
      let internalPerform = projects.filter(item => item.internal).map(item => item.internal.command);
      exter = exter.filter(item => externalPerform.includes(item.name));
      inter = inter.filter(item => internalPerform.includes(item.name));
      return exter.concat(inter);
    } catch (error) {
      return error;
    } 
  };  

  const performRowFilterTemplate = (options) => {
    let performs = getPerforms();
    return (
      <MultiSelect
        value={options.value}
        options={performs}
        itemTemplate={performBody}
        onChange={(e) => options.filterApplyCallback(e.value)}
        optionLabel='name'
        placeholder='סנן'
        className='p-column-filter'
      />
    );
  };

  // requires
  const activeRequires = projects.map(item => item.requires.command);
  const requires = getInternalsArray(internals).filter(item => activeRequires.includes(item));
  const requireFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={requires}
        itemTemplate={requireItemTemplate}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder='סנן'
        className='p-column-filter'
      />
    );
  };

  const requireItemTemplate = (option) => {
    return <p>{option}</p>;
  };

  const requireEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={internals}
        itemTemplate={requireItemEditorTemplate}
        onChange={(e) => {
          options.editorCallback(e.value);
          options.rowData.requires = e.value;
          options.rowData.requiresId = e.value.id;
        }}
        optionLabel='command'
        placeholder={options.rowData.requires.command}
        className='p-column-filter'
      />
    );
  };

  const requireItemEditorTemplate = (option) => {
    return <p>{option.command}</p>;
  };

  return <>
    <ProjectContext.Provider value={{ projects, setProjects,displayProjects, setDisplayProjects, externals, setExternals, internals, setInternals}}>
      <div>
        <Toast ref={toast} position='top-left' />
        <div className='card'>
          <div style={{ textAlign: 'center' }}>
            <img alt='סקייבר' src={window.location.origin + '/images/skyvar.png'} width='32' style={{ position: 'relative', marginBottom: '-1em' }} />
            <span style={{ fontWeight: 'bold', fontSize: '2em' }}> תיעוד </span>
            <h3 id='titleH3'>תצוגת מערכות מידע</h3>
          </div>
          <DataTable ref={dt} value={displayProjects} exportFilename="documentation" paginator editMode="row" rows={10} dataKey="id" onRowEditComplete={onRowEditComplete} onRowEditInit={onRowEditInit} sortField="name" sortOrder={1} filters={filters} filterDisplay="row" loading={loading} scrollable            selectionMode={'checkbox'} selection={selectedProjects} onSelectionChange={(e) => setSelectedProjects(e.value)}
            globalFilterFields={['name', 'purpose', 'description', 'status', 'productionTime', 'requires.command', 'factorableType', 'perform.name', 'population', 'classification', 'environment']} header={header} emptyMessage='אין מערכות להציג' >
            <Column style={{ minWidth: '5rem' }} body={openCardBodyTemplate} />
            <Column field='name' header='שם המערכת' editor={(options) => textEditor(options)} sortable filter filterPlaceholder='חפש' style={{ minWidth: '15rem' }} />
            <Column field='purpose' header='מטרת המערכת' editor={(options) => textEditor(options)} sortable filter filterPlaceholder='חפש' style={{ minWidth: '15rem' }} />
            <Column field='requires' header='גוף דורש' editor={(options) => requireEditor(options)} style={{ minWidth: '8rem' }} filter filterField='requires.command' showFilterMenu={false} filterPlaceholder='חיפוש גוף דורש' body={requireTemplate} filterElement={requireFilterTemplate} />
            <Column field='population' header='סוג אוכלוסיה' editor={(options) => populationEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={populationBodyTemplate} filter filterElement={populationRowFilterTemplate} />
            <Column field='classification' header='סיווג' editor={(options) => classificationEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={classificationBodyTemplate} filter filterElement={classificationRowFilterTemplate} />
            <Column field='environment' header='סביבת פיתוח' editor={(options) => environmentEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={environmentBodyTemplate} filter filterElement={environmentRowFilterTemplate} />
            <Column field='factorableType' class='column' header='פיתוח' showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '8rem' }} body={factorableTypeBodyTemplate} filter filterElement={factorableTypeRowFilterTemplate} />
            <Column field='perform' header='גוף מבצע' editor={(options) => performEditor(options)} filterField='perform' showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '8rem' }} body={performBodyTemplate} filter filterElement={performRowFilterTemplate} />
            <Column field='status' header='סטטוס' editor={(options) => statusEditor(options)} showFilterMenu={false} filterMenuStyle={{ width: '8rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
            <Column field='productionTime' filterField='productionTime' dataType='date' header='תאריך עליה לאויר' sortable editor={(options) => editableRows[options.rowData.id] ? productionTimeEditor(options) : null} style={{ minWidth: '15rem' }} body={productionTimeBodyTemplate} filter filterElement={productionTimeFilterTemplate} />
            <Column rowEditor={true} style={{ minWidth: '7rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            <Column body={deleteBodyTemplate} style={{ minWidth: '6rem' }}></Column>
          </DataTable>

          <Dialog visible={deleteProjectDialog} style={{ width: '20%' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header='אזהרה!' modal onHide={hideDeleteProjectDialog}>
            <DeleteDialog project={project} confirmDelete={confirmDelete} hideDeleteProjectDialog={hideDeleteProjectDialog}></DeleteDialog>
          </Dialog>
  
          <Dialog visible={visibleSystemDialog} style={{ width: '25%' }} onHide={() => { if (!visibleSystemDialog) return; setVisibleSystemDialog(false); }}>
            <SystemDialog dataSystem={dataSystem} style={{ width: '100%' }}></SystemDialog>
          </Dialog>
  
          <Dialog visible={visibleRequireDialog} onHide={() => { if (!visibleRequireDialog) return; setVisibleRequireDialog(false); }}>
            <RequireDialog dataSystem={requireConcats}></RequireDialog>
          </Dialog>
        </div>
      </div>

    </ProjectContext.Provider>
  </>;
}
