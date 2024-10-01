import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";

import { factorableTypes, requires } from "../../../services/consts";
import { ProjectService } from "../../../services/ProjectService";
import CheckMultipleName from "../CheckMultipleName";
import { AddDemand, AddRequire } from "../requireForm/AddRequire";
import './AddProjectForm.css';


export const AddProject = () => {

    const [project, setProject] = useState({  
        name :'',
        purpose : '',
        description : '',
        require : '',
        perform : '',
        factorableType : '',
        status : '',
        productionTime : '',
        classification : '',
        enviroment : '',
        population : ''
    });
    const [visible, setVisible] = useState(false);
    const [hideAddDemand, setHideAddDemand] = useState(false);
    const [selectedDemandFactor, setSelectedDemandFactor] = useState(null);



    const handleValidation = (name) => {
        const data = ProjectService.getData();
        data.forEach(obj => {
            if (obj.name === name) {
                setVisible(true)
            }
        })
    };

    const handelSelectDemandFactor = (value) => {
        value === 'אחר' ? setHideAddDemand(true) : setProject({require:value}) 
    }

    const submit=()=>{
        console.log('Add project');
        //TODO add project to DB.
    }
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
                                onChange={(e) => handelSelectDemandFactor(e.value)}
                                    options={requires} className="w-full md:w-14rem field" />
                                <label htmlFor="require">בחר גוף דורש</label>
                            </FloatLabel>
                        </div>
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
                            {/* <FloatLabel className="field">
                                {selectedType == null && <Dropdown inputid="dd-operating" value={explain}
                                    onClick={(e) => setExplain("fgh")}
                                    options={['לאחר בחירת סוג  יאופשר שדה זה']} className="w-full md:w-14rem field" />}
                                {selectedType === 'פנימי' && <Dropdown inputid="dd-operating" value={selectedOperatingFactor}
                                    onChange={(e) => handelSelectOperatingFactor(e.value)}
                                    options={demandFactors} className="w-full md:w-14rem field" />}
                                {selectedType === 'חיצוני' && <Dropdown inputid="dd-operating" value={selectedOperatingCompany}
                                    onChange={(e) => handelSelectOperatingCompany(e.value)}
                                    options={operatingCompany} className="w-full md:w-14rem field" />}
                                <label htmlFor="dd-operating">בחר גוף מבצע</label>
                            </FloatLabel> */}
                        </div>

                        {/* <div className="card item5">
                            <FloatLabel className="field" >
                                <Dropdown inputid="dd-status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.value)}
                                    options={statuses} className="w-full md:w-14rem field" />
                                <label htmlFor="dd-status">בחר סטטוס</label>
                            </FloatLabel>
                        </div>
                        <div className="card item7">
                            {selectedStatus === statuses.DONE &&
                                <FloatLabel className="field" >
                                    <Calendar inputid="dd-date" value={productionTime} onChange={(e) => setProductionTime(e.value)} showButtonBar className="w-full md:w-14rem field" />
                                    <label htmlFor="dd-date">בחר תאריך</label>
                                </FloatLabel>
                            }
                        </div>
                        <div className="card item9">
                            <FloatLabel className="field" >
                                <Dropdown inputid="classification" value={selectedClassification} onChange={(e) => setSelectedClassification(e.value)}
                                    options={classifications} className="w-full md:w-14rem field" />
                                <label htmlFor="classification">בחר סיווג</label>
                            </FloatLabel>
                        </div>
                        <div className="card item10">
                            <FloatLabel className="field" >
                                <Dropdown inputid="devEnvironment" value={selectedDevEnvironment} onChange={(e) => setSelectedDevEnvironment(e.value)}
                                    options={environments} className="w-full md:w-14rem field" />
                                <label htmlFor="devEnvironment">בחר סביבת פיתוח</label>
                            </FloatLabel>
                        </div>
                        <div className="card item11">
                            <FloatLabel className="field" >
                                <MultiSelect inputid="population" value={selectedPopulation} onChange={(e) => setSelectedPopulation(e.value)}
                                    options={populations} className="w-full md:w-14rem field" />
                                <label htmlFor="population">בחר אוכלוסיה</label>
                            </FloatLabel>
                        </div> */}
                    </div>
                    <div id="button">
                        <Button severity="secondary" label="הוסף" type="submit" onClick={submit} />
                    </div>
                </form>

                 <Dialog header="אזהרה ⚠️" visible={visible} onHide={() => setVisible(false)}>
                    <CheckMultipleName setVisible={setVisible} setProject={setProject} />
                </Dialog>
                <Dialog header="הוספת גוף דורש " visible={hideAddDemand} onHide={() => { if (!hideAddDemand) return; setHideAddDemand(false); }}
                    footer={<AddRequire setProject={setProject} hide={setHideAddDemand} />}>
                </Dialog>

                {/*
                <Dialog header="הוספת גוף מבצע פנימי" visible={hideAddOperatingFactor} onHide={() => { if (!hideAddOperatingFactor) return; setHideAddOperatingFactor(false); }}
                    footer={<AddDemand setSelected={setSelectedOperatingFactor} setDemandFactors={setDemandFactors} hide={setHideAddOperatingFactor} demandFactors={demandFactors} />}>
                </Dialog>

                <Dialog header="הוספת גוף מבצע חיצוני" visible={hideAddOperatingCompany} onHide={() => { if (!hideAddOperatingCompany) return; setHideAddOperatingCompany(false); }}
                    footer={<AddOperatingForm setSelected={setSelectedOperatingCompany} setOperatingFactors={setOperatingCompany} hide={setHideAddOperatingCompany} operatingFactor={operatingCompany} />}>
                </Dialog> */}
            </div>
    </>
  );
};
