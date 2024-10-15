import React, { useContext, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';

import { classifications, environments, factorableTypes, populations, statuses } from "../../../services/consts";
import { ProjectContext } from "../../../services/ProjectContext";
import CheckMultipleName from "../CheckMultipleName";
import {  AddInternal } from "../factorsForm/AddInternal";
import  { AddExternal } from "../factorsForm/AddExternal";
import './AddProjectForm.css';
import { createProject } from "../../../services/ProjectService";


export const AddProject = ({toast}) => {
    const {projects} = useContext(ProjectContext)
    const [project, setProject] = useState({  
        name :'',
        purpose : '',
        description : '',
        require : '',
        requiresId : '',
        factorableType : '',
        status : '',
        productionTime : null,
        classification : '',
        environment : '',
        population : '',
        external:null,
        externalId:null,
        internal:null,
        internalId:null
    });
    const [visible, setVisible] = useState(false);
    const [hideAddDemand, setHideAddDemand] = useState(false);
    const [hideAddOperatingCompany, setHideAddOperatingCompany] = useState(false);
    const [hideAddOperatingFactor, setHideAddOperatingFactor] = useState(false);


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

    const submit=()=>{
        //TODO add preventDefault in order to prevent  re-render
        let { external, internal, require, ...data } = project;
        createProject(data)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'המערכת נוספה בהצלחה', life: 3000 });
    }


   const {externals} = useContext(ProjectContext);
   const {internals} = useContext(ProjectContext);


  return (
    <>
      <div id="addProjectForm">
                <form action="">
                    <div className="card grid-container">
                        <div className="card item1">
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
                        </div>
                        <div className="card item2">
                            <FloatLabel className="field">
                                <InputTextarea className="w-full md:w-30rem field" id="description" value={project.description} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        description: e.target.value
                                })) } rows={4} cols={30} />
                                <label htmlFor="description">תאור המערכת</label>
                            </FloatLabel>
                        </div>
                        <div className="card item8">
                            <FloatLabel className="field">
                                <InputTextarea className="w-full md:w-30rem field" id="purpose" value={project.purpose} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        purpose: e.target.value
                                }))}/>
                                <label htmlFor="purpose">מטרת המערכת</label>
                            </FloatLabel>
                        </div>
                        <div className="card item3">
                            <FloatLabel className="field" >
                                <Dropdown id="require" value={project.require}
                                onChange={(e) => handelSelectRequire(e.value)}
                                    options={internals} optionLabel="command" className="w-full md:w-14rem field" />
                                <label htmlFor="require">בחר גוף דורש</label>
                            </FloatLabel>
                        </div>
                        <p value={project.require}></p>
                        <div className="card item4">
                            <FloatLabel className="field" >
                                <Dropdown id="factorableType" value={project.factorableType} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        factorableType: e.target.value
                                }))}
                                    options={Object.values(factorableTypes)} className="w-full md:w-14rem field" />
                                <label htmlFor="factorableType">בחר סוג פיתוח</label>
                            </FloatLabel>
                        </div>

                        <div className="card item6">
                            <FloatLabel className="field">
                                {project.factorableType === '' && <Dropdown inputid="dd-operating"
                                    options={['לאחר בחירת סוג  יאופשר שדה זה']} className="w-full md:w-14rem field" />}
                                {project.factorableType === factorableTypes.INTERNAL && <Dropdown inputid="dd-operating" value={project.internal}
                                    onChange={(e) => handelSelectInternal(e.value)}
                                    options={internals} optionLabel="command" className="w-full md:w-14rem field" />}
                                {project.factorableType === factorableTypes.EXTERNAL && <Dropdown inputid="dd-operating" value={project.external}
                                    onChange={(e) => handelSelectExternal(e.value)}
                                    options={externals} optionLabel="name" className="w-full md:w-14rem field" />}
                                <label htmlFor="dd-operating">בחר גוף מבצע</label>
                            </FloatLabel>
                        </div>

                        <div className="card item5">
                            <FloatLabel className="field" >
                                <Dropdown inputid="dd-status" value={project.status} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        status: e.target.value
                                }))}
                                    options={Object.values(statuses)} className="w-full md:w-14rem field" />
                                <label htmlFor="dd-status">בחר סטטוס</label>
                            </FloatLabel>
                        </div>
                        <div className="card item7">
                            {project.status === statuses.DONE &&
                                <FloatLabel className="field" >
                                    <Calendar inputid="dd-date" value={project.productionTime} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        productionTime: e.target.value
                                }))} showButtonBar className="w-full md:w-14rem field" />
                                    <label htmlFor="dd-date">בחר תאריך</label>
                                </FloatLabel>
                            }
                        </div> 
                        <div className="card item9">
                            <FloatLabel className="field" >
                                <Dropdown inputid="classification" value={project.classification} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        classification: e.target.value
                                }))}
                                    options={Object.values(classifications)} className="w-full md:w-14rem field" />
                                <label htmlFor="classification">בחר סיווג</label>
                            </FloatLabel>
                        </div>
                        <div className="card item10">
                            <FloatLabel className="field" >
                                <Dropdown inputid="devEnvironment" value={project.environment} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        environment : e.target.value
                                }))}
                                    options={Object.values(environments)} className="w-full md:w-14rem field" />
                                <label htmlFor="devEnvironment">בחר סביבת פיתוח</label>
                            </FloatLabel>
                        </div>
                        <div className="card item11">
                            <FloatLabel className="field" >
                                <MultiSelect inputid="population" value={project.population} onChange={(e) => setProject((prevProject) => ({
                                        ...prevProject,
                                        population : e.target.value
                                }))}
                                    options={Object.values(populations)} className="w-full md:w-14rem field" />
                                <label htmlFor="population">בחר אוכלוסיה</label>
                            </FloatLabel>
                        </div> 
                    </div>
                    <div id="button">
                        <Button severity="secondary" label="הוסף" type="submit" onClick={submit} />
                    </div>
                </form>

                 <Dialog header="אזהרה ⚠️" visible={visible} onHide={() => setVisible(false)}>
                    <CheckMultipleName setVisible={setVisible} setProject={setProject} />
                </Dialog>

                <Dialog header="הוספת גוף דורש " visible={hideAddDemand} onHide={() => { if (!hideAddDemand) return; setHideAddDemand(false); }}
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
