import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from "primereact/dialog";
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import 'primeicons/primeicons.css';

import { classifications, environments, factorableTypes, populations, statuses } from "../../../services/consts";
import { ProjectService } from "../../../services/ProjectService";
import { AddDemand } from '../demandForm/AddDemand';
import AddOperatingForm from '../operationForm/AddOperatingForm';
import CheckMultipleName from "../CheckMultipleName";
import './AddProjectForm.css';


const AddProjectForm = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [purpose, setPurpose] = useState('');
    const [productionTime, setProductionTime] = useState('Invalid Date');
    const [selectedDemandFactor, setSelectedDemandFactor] = useState(null);
    const [selectedOperatingFactor, setSelectedOperatingFactor] = useState(null);
    const [selectedOperatingCompany, setSelectedOperatingCompany] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedClassification, setSelectedClassification] = useState(null);
    const [selectedDevEnvironment, setSelectedDevEnvironment] = useState(null);
    const [selectedPopulation, setSelectedPopulation] = useState(null);
    const [visible, setVisible] = useState(false);
    const [hideAddOperatingCompany, setHideAddOperatingCompany] = useState(false);
    const [hideAddOperatingFactor, setHideAddOperatingFactor] = useState(false);
    const [hideAddDemand, setHideAddDemand] = useState(false);
    const [demandFactors, setDemandFactors] = useState(['אחר', 'פיקוד צפון', 'פיקוד דרום', 'פיקוד מרכז',]);
    const [operatingCompany, setOperatingCompany] = useState(['אחר', 'סקייבר', 'אלביט',]);

    const [explain, setExplain] = useState(null)

    const addProject = () => {
        const project = {}
        project.name = name;
        project.purpose = purpose;
        project.description = description;
        project.demandFactor = selectedDemandFactor;
        project.operatingFactor = selectedOperatingFactor || selectedOperatingCompany;
        project.type = selectedType;
        project.status = selectedStatus;
        project.productionTime = productionTime;
        project.classification = selectedClassification;
        project.devEnvironment = selectedDevEnvironment;
        project.population = selectedPopulation;
    };

    const handleValidation = (name) => {
        const data = ProjectService.getData();
        data.forEach(obj => {
            if (obj.name === name) {
                setVisible(true)
            }
        })
    };

    const handelSelectOperatingFactor = (value) => {
         value === 'אחר' ? setHideAddOperatingFactor(true) : setSelectedOperatingFactor(value) 
    }

    const handelSelectOperatingCompany = (value) => {
         value === 'אחר' ? setHideAddOperatingCompany(true) : setSelectedOperatingCompany(value) 
    }

    const handelSelectDemandFactor = (value) => {
        value === 'אחר' ? setHideAddDemand(true) : setSelectedDemandFactor(value) 
    }

    return (
        <>
            <div id="addProjectForm">
                <form action="">
                    <div className="card" class="grid-container">
                        <div className="card" class="item1">
                            <FloatLabel className="field">
                                <InputText className="w-full md:w-30rem field" inputId="name" value={name} onChange={(e) => {
                                    setName(e.target.value)
                                    handleValidation(e.target.value)
                                }} rows={4} cols={30}/>
                                <label htmlFor="name">שם הפרויקט</label>
                            </FloatLabel>
                        </div>
                        <div className="card" class="item2">
                            <FloatLabel className="field">
                                <InputTextarea className="w-full md:w-30rem field" inputId="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} cols={30} />
                                <label htmlFor="description">תאור הפרויקט</label>
                            </FloatLabel>
                        </div>
                        <div className="card" class="item8">
                            <FloatLabel className="field">
                                <InputTextarea className="w-full md:w-30rem field" inputId="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                                <label htmlFor="purpose">מטרת הפרויקט</label>
                            </FloatLabel>
                        </div>
                        <div className="card" class="item3">
                            <FloatLabel className="field" >
                                <Dropdown inputId="dd-demand" value={selectedDemandFactor} onChange={(e) => handelSelectDemandFactor(e.value)}
                                    options={demandFactors} className="w-full md:w-14rem field" />
                                <label htmlFor="dd-demand">בחר גוף דורש</label>
                            </FloatLabel>
                        </div>
                        <div className="card" class="item4">
                            <FloatLabel className="field" >
                                <Dropdown inputId="dd-type" value={selectedType} onChange={(e) => setSelectedType(e.value)}
                                    options={factorableTypes} className="w-full md:w-14rem field" />
                                <label htmlFor="dd-type">בחר סוג פיתוח</label>
                            </FloatLabel>
                        </div>

                        <div className="card" class="item6">
                            <FloatLabel className="field">
                                {selectedType == null && <Dropdown inputId="dd-operating" value={explain}
                                    onClick={(e) => setExplain("fgh")}
                                    options={['לאחר בחירת סוג  יאופשר שדה זה']} className="w-full md:w-14rem field" />}
                                {selectedType === 'פנימי' && <Dropdown inputId="dd-operating" value={selectedOperatingFactor}
                                    onChange={(e) => handelSelectOperatingFactor(e.value)}
                                    options={demandFactors} className="w-full md:w-14rem field" />}
                                {selectedType === 'חיצוני' && <Dropdown inputId="dd-operating" value={selectedOperatingCompany}
                                    onChange={(e) => handelSelectOperatingCompany(e.value)}
                                    options={operatingCompany} className="w-full md:w-14rem field" />}
                                <label htmlFor="dd-operating">בחר גוף מבצע</label>
                            </FloatLabel>
                        </div>

                        <div className="card" class="item5">
                            <FloatLabel className="field" >
                                <Dropdown inputId="dd-status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.value)}
                                    options={statuses} className="w-full md:w-14rem field" />
                                <label htmlFor="dd-status">בחר סטטוס</label>
                            </FloatLabel>
                        </div>
                        <div className="card" class="item7">
                            {selectedStatus === 'עלה לאויר' &&
                                <FloatLabel className="field" >
                                    <Calendar inputId="dd-date" value={productionTime} onChange={(e) => setProductionTime(e.value)} showButtonBar className="w-full md:w-14rem field" />
                                    <label htmlFor="dd-date">בחר תאריך</label>
                                </FloatLabel>
                            }
                        </div>
                        <div className="card" class="item9">
                            <FloatLabel className="field" >
                                <Dropdown inputId="classification" value={selectedClassification} onChange={(e) => setSelectedClassification(e.value)}
                                    options={classifications} className="w-full md:w-14rem field" />
                                <label htmlFor="classification">בחר סיווג</label>
                            </FloatLabel>
                        </div>
                        <div className="card" class="item10">
                            <FloatLabel className="field" >
                                <Dropdown inputId="devEnvironment" value={selectedDevEnvironment} onChange={(e) => setSelectedDevEnvironment(e.value)}
                                    options={environments} className="w-full md:w-14rem field" />
                                <label htmlFor="devEnvironment">בחר סביבת פיתוח</label>
                            </FloatLabel>
                        </div>
                        <div className="card" class="item11">
                            <FloatLabel className="field" >
                                <MultiSelect inputId="population" value={selectedPopulation} onChange={(e) => setSelectedPopulation(e.value)}
                                    options={populations} className="w-full md:w-14rem field" />
                                <label htmlFor="population">בחר אוכלוסיה</label>
                            </FloatLabel>
                        </div>
                    </div>
                    <div id="button">
                        <Button severity="secondary" label="הוסף" type="submit" onClick={addProject} />
                    </div>
                </form>

                <Dialog header="אזהרה ⚠️" visible={visible} onHide={() => setVisible(false)}>
                    <CheckMultipleName setVisible={setVisible} setName={setName} />
                </Dialog>

                <Dialog header="הוספת גוף דורש " visible={hideAddDemand} onHide={() => { if (!hideAddDemand) return; setHideAddDemand(false); }}
                    footer={<AddDemand setSelected={setSelectedDemandFactor} setDemandFactors={setDemandFactors} hide={setHideAddDemand} demandFactors={demandFactors} />}>
                </Dialog>

                <Dialog header="הוספת גוף מבצע פנימי" visible={hideAddOperatingFactor} onHide={() => { if (!hideAddOperatingFactor) return; setHideAddOperatingFactor(false); }}
                    footer={<AddDemand setSelected={setSelectedOperatingFactor} setDemandFactors={setDemandFactors} hide={setHideAddOperatingFactor} demandFactors={demandFactors} />}>
                </Dialog>

                <Dialog header="הוספת גוף מבצע חיצוני" visible={hideAddOperatingCompany} onHide={() => { if (!hideAddOperatingCompany) return; setHideAddOperatingCompany(false); }}
                    footer={<AddOperatingForm setSelected={setSelectedOperatingCompany} setOperatingFactors={setOperatingCompany} hide={setHideAddOperatingCompany} operatingFactor={operatingCompany} />}>
                </Dialog>
            </div>
        </>
    );
};

export default AddProjectForm;
