import React, { useContext, useRef, useState } from "react";

import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from 'primereact/multiselect';
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';
import { Message } from 'primereact/message';
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { factorableTypes, internalImage, populations, statuses, classifications, environments } from "../../services/consts";
import { ProjectContext } from "../../services/ProjectContext";
import { createProject } from "../../services/ProjectService";
import { getExternalDisplay } from "../../services/ExternalsService";
import { getInternalDisplay } from "../../services/InternalService";
import { displayToast } from "../../services/toast";

import { AddInternal } from "./AddInternal";
import { AddExternal } from "./AddExternal";
import { CheckMultipleName } from "./CheckMultipleName";

import './Form.css';


export const AddProject = ({toast,hide}) => {
    const {projects, setProjects} = useContext(ProjectContext)
    const {setDisplayProjects} = useContext(ProjectContext)
    const [project, setProject] = useState({  
        name: '',
        purpose: '',
        description: '',
        require: '',
        requiresId: '',
        factorableType: '',
        status: '',
        productionTime: null,
        classification: '',
        environment: '',
        population: '',
        external: null,
        externalId: null,
        internal: null,
        internalId: null
    });

    const [visible, setVisible] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [hideAddDemand, setHideAddDemand] = useState(false);
    const [hideAddOperatingCompany, setHideAddOperatingCompany] = useState(false);
    const [hideAddOperatingFactor, setHideAddOperatingFactor] = useState(false);

    const { externals } = useContext(ProjectContext);
    const { internals } = useContext(ProjectContext);
    const formRef = useRef(null);

    const handleValidation = (name) => {
        projects.forEach(obj => {
            if (obj.name === name) {
                setVisible(true)
            }
        })
    };

    const handelSelectRequire = (value) => {
        let updates = {require: value, requiresId: value.id}
        value.command === 'אחר' ? setHideAddDemand(true) :setProject((prevProject) => ({
            ...prevProject,
            ...updates
        })) 
    }

    const handelSelectInternal = (value) => {
        let updates = {internal : value , internalId : value.id}
        value.command === 'אחר' ? setHideAddOperatingFactor(true) : setProject((prevProject) => ({
            ...prevProject,
            ...updates            
        }))
   }

   const handelSelectExternal = async (value) => {
        let updates = {external : value , externalId: value.id}
        value.name === 'אחר' ? setHideAddOperatingCompany(true) : setProject((prevProject) => ({
            ...prevProject,
            ...updates
        }))
   }

    const submit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        let { external, internal, require, ...data } = project;
        if (dataValidation(data)) {
            const res = await createProject(data);
            if(res.data){
                if(!res.data.productionTime) res.data.productionTime = new Date('')
                setProjects(pro => [...pro, res.data]);
                setDisplayProjects(pro => [...pro, addPerform(res.data)]);
                displayToast(toast, 'success', 'Success', res.data.name+' נוסף בהצלחה')
            }
            else if(res.response.data.error){
                displayToast(toast, 'error', 'Error', res.response.data.error)
            }
            setFormSubmitted(false);
            hide(false)
        }
    }

    const addPerform = (obj) =>{
        if (obj.internal)
            return { ...obj, perform: {name: obj.internal.command, image: internalImage} };
        else if (obj.external)
            return { ...obj, perform: {name: obj.external.name, image: obj.external.image } };
    };

    const dataValidation = (data) => {
        const validationStatus = (data.status && project.status == statuses.DONE && project.productionTime) || (project.status != statuses.DONE && data.status);
        const developmentType = data.internalId || data.externalId;
        return data.name &&
            data.purpose &&
            data.description &&
            data.requiresId &&
            data.factorableType &&
            validationStatus &&
            data.classification &&
            data.environment &&
            data.population &&
            developmentType
    }
      
    
  return (
    <>
      <div id="addProjectForm">
                <form ref={formRef} noValidate action="">
                    <div className="card grid-container">
                        
                        <div className="card name">
                            <FloatLabel className="field">
                                <InputText className="w-full md:w-30rem field" id="name" value={project.name} onChange={(e) => {
                                    setProject((prevProject) => ({
                                        ...prevProject,
                                        name: e.target.value
                                }))
                                    handleValidation(e.target.value) 
                                }} rows={4} cols={30}/>
                                <label htmlFor="name">שם המערכת</label>
                            </FloatLabel>
                            {formSubmitted && !project.name && (
                                <Message severity="error" text="שם מערכת הינו שדה חובה" />
                            )}
                        </div>
                        <div className="card description">
                            <FloatLabel className="field">
                                <InputTextarea className="w-full md:w-30rem field" id="description" value={project.description} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        description: e.target.value
                                })) } rows={4} cols={30} />
                                <label htmlFor="description">תאור המערכת</label>
                            </FloatLabel>
                            {formSubmitted && !project.description && (
                                <Message severity="error" text="תאור המערכת הינו שדה חובה" />
                            )}
                        </div>
                        <div className="card purpose">
                            <FloatLabel className="field">
                                <InputTextarea className="w-full md:w-30rem field" id="purpose" value={project.purpose} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        purpose: e.target.value
                                }))}/>
                                <label htmlFor="purpose">מטרת המערכת</label>
                            </FloatLabel>
                            {formSubmitted && !project.purpose && (
                                <Message severity="error" text="מטרת המערכת הינו שדה חובה" />
                            )}
                        </div>
                        <div className="card external">
                            <FloatLabel className="field" >
                            <Dropdown id="require"
                                    value={project.require}
                                    onChange={(e) => handelSelectRequire(e.value)}
                                    options={getInternalDisplay(internals)}
                                    optionLabel="command"
                                    className="w-full md:w-14rem field"
                                    required
                                />
                                <label htmlFor="require">בחר גוף דורש</label>
                            </FloatLabel>
                            {formSubmitted && !project.require && (
                                <Message severity="error" text=" הבחירה הינה חובה " />
                            )}
                        </div>
                        <p value={project.require}></p>
                        <div className="card factorableType">
                            <FloatLabel className="field" >
                                <Dropdown id="factorableType" value={project.factorableType} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        factorableType: e.target.value,
                                        external: null,
                                        externalId: null,
                                        internal: null,
                                        internalId: null
                                }))}
                                    options={Object.values(factorableTypes)} className="w-full md:w-14rem field" required/>
                                <label htmlFor="factorableType">בחר סוג פיתוח</label>
                            </FloatLabel>
                            {formSubmitted && !project.factorableType && (
                                <Message severity="error" text=" הבחירה הינה חובה " />
                            )}
                        </div>
                        <div className="card perform">
                            <FloatLabel className="field">
                                {project.factorableType === '' && <Dropdown inputid="dd-operating"
                                    options={['לאחר בחירת סוג יאופשר שדה זה']} className="w-full md:w-14rem field" required />}
                                {project.factorableType === factorableTypes.INTERNAL && <Dropdown inputid="dd-operating" value={project.internal}
                                    onChange={(e) => handelSelectInternal(e.value)}
                                    options={getInternalDisplay(internals)} optionLabel="command" className="w-full md:w-14rem field" required />}
                                {project.factorableType === factorableTypes.EXTERNAL && <Dropdown inputid="dd-operating" value={project.external}
                                    onChange={(e) => handelSelectExternal(e.value)}
                                    options={getExternalDisplay(externals)} optionLabel="name" className="w-full md:w-14rem field" required />}
                                <label htmlFor="dd-operating">בחר גוף מבצע</label>
                            </FloatLabel>
                            {formSubmitted && !project.internal && !project.external && (
                                <Message severity="error" text=" הבחירה הינה חובה " />
                            )}
                        </div>
                        <div className="card status">
                            <FloatLabel className="field" >
                                <Dropdown inputid="dd-status" value={project.status} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        status: e.target.value
                                }))}
                                    options={Object.values(statuses)} className="w-full md:w-14rem field" required/>
                                <label htmlFor="dd-status">בחר סטטוס</label>
                            </FloatLabel>
                            {formSubmitted && !project.status && (
                                <Message severity="error" text=" הבחירה הינה חובה " />
                            )}
                        </div>
                        <div className="card productionTime">
                            {project.status === statuses.DONE &&
                                <FloatLabel className="field" >
                                    <Calendar inputid="dd-date" value={project.productionTime} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        productionTime: e.target.value
                                }))} showButtonBar className="w-full md:w-14rem field" required/>
                                    <label htmlFor="dd-date">בחר תאריך</label>
                                </FloatLabel>
                            }
                        </div> 
                        <div className="card classification">
                            <FloatLabel className="field" >
                                <Dropdown inputid="classification" value={project.classification} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        classification: e.target.value
                                }))}
                                    options={Object.values(classifications)} className="w-full md:w-14rem field" required />
                                <label htmlFor="classification">בחר סיווג</label>
                            </FloatLabel>
                            {formSubmitted && !project.classification && (
                                <Message severity="error" text=" הבחירה הינה חובה " />
                            )}
                        </div>
                        <div className="card environment">
                            <FloatLabel className="field" >
                                <Dropdown inputid="devEnvironment" value={project.environment} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        environment : e.target.value
                                }))}
                                    options={Object.values(environments)} className="w-full md:w-14rem field" required />
                                <label htmlFor="devEnvironment">בחר סביבת פיתוח</label>
                            </FloatLabel>
                            {formSubmitted && !project.environment && (
                                <Message severity="error" text=" הבחירה הינה חובה " />
                            )}
                        </div>
                        <div className="card population">
                            <FloatLabel className="field" >
                                <MultiSelect inputid="population" value={project.population} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        population : e.target.value
                                }))}
                                    options={Object.values(populations)} className="w-full md:w-14rem field" />
                                <label htmlFor="population">בחר אוכלוסיה</label>
                            </FloatLabel>
                            {formSubmitted && !project.population && (
                                <Message severity="error" text=" הבחירה הינה חובה " />
                            )}
                        </div> 
                    </div>
                    <div id="button">
                        <Button severity="secondary" label="הוסף" type="submit" onClick={submit} />
                    </div>
                </form>

                 <Dialog header="אזהרה ⚠️" visible={visible} onHide={() => setVisible(false)}>
                    <CheckMultipleName setVisible={setVisible} setProject={setProject} />
                </Dialog>

                <Dialog header="הוספת גוף דורש" visible={hideAddDemand} onHide={() => { if (!hideAddDemand) return; setHideAddDemand(false); }}
                    footer={<AddInternal setProject={setProject} hide={setHideAddDemand} parent={'require'} toast={toast}/>}>
                </Dialog>
                
                <Dialog header="הוספת גוף מבצע פנימי" visible={hideAddOperatingFactor} onHide={() => { if (!hideAddOperatingFactor) return; setHideAddOperatingFactor(false); }}
                    footer={<AddInternal setProject={setProject} hide={setHideAddOperatingFactor} parent={'internal'} toast={toast} />}>
                </Dialog>

                <Dialog header="הוספת גוף מבצע חיצוני" visible={hideAddOperatingCompany} onHide={() => { if (!hideAddOperatingCompany) return; setHideAddOperatingCompany(false); }}
                    footer={<AddExternal setProject={setProject} hide={setHideAddOperatingCompany} toast={toast} />}>
                </Dialog>
            </div>

    </>
  );
};
