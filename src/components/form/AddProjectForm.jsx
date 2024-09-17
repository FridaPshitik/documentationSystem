import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";

import 'primeicons/primeicons.css';
import './AddProjectForm.css';
import { CustomerService } from "../../services/CustomerService"
import AddDemandForm from './AddDemandForm';
import AddOperatingForm from './AddOperatingForm';
import CheckMultipleName from "./CheckMultipleName";
import { InputTextarea } from "primereact/inputtextarea";


const AddProjectForm = () => {

    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('Invalid Date');
    const [selectedDemandFactor, setSelectedDemandFactor] = useState(null);
    const [selectedOperatingFactor, setSelectedOperatingFactor] = useState(null);
    const [selectedOperatingCompany, setSelectedOperatingCompany] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [visible, setVisible] = useState(false);
    const [hideAddOperatingCompany, setHideAddOperatingCompany] = useState(false);
    const [hideAddOperatingFactor, setHideAddOperatingFactor] = useState(false);
    const [hideAddDemand, setHideAddDemand] = useState(false);
    const [demandFactors, setDemandFactors] = useState(['אחר', 'פיקוד צפון', 'פיקוד דרום', 'פיקוד מרכז',]);
    const [operatingCompany, setOperatingCompany] = useState(['אחר', 'סקייבר', 'אלביט',]);
    const statuses = ['באפיון', 'בפיתוח', 'בתהליך', 'עלה לאויר'];
    const types = ['פנימי', 'חיצוני'];

    const addProject = () => {
        const project = {}
        project.projectName = projectName;
        project.description = description;
        project.demandFactor = selectedDemandFactor;
        project.operatingFactor = selectedOperatingFactor || selectedOperatingCompany;
        project.type = selectedType;
        project.status = selectedStatus;
        project.date = date;
    };

    const handleValidation = (name) => {
        const data = CustomerService.getData();
        data.forEach(obj => {
            if (obj.name === name) {
                setVisible(true)
            }
        })
    };

    const handelSelectOperatingFactor = (value) => {
        { value == 'אחר' ? setHideAddOperatingFactor(true) : setSelectedOperatingFactor(value) }
    }

    const handelSelectOperatingCompany = (value) => {
        { value == 'אחר' ? setHideAddOperatingCompany(true) : setSelectedOperatingCompany(value) }
    }

    const handelSelectDemandFactor = (value) => {
        { value == 'אחר' ? setHideAddDemand(true) : setSelectedDemandFactor(value) }
    }

    return (
        <>
            <div id="addProjectForm">
                <form action="">

                    <FloatLabel className="field">
                        <InputText className="w-full md:w-14rem field" id="projectName" value={projectName} onChange={(e) => {
                            setProjectName(e.target.value)
                            handleValidation(e.target.value)
                        }} />
                        <label htmlFor="projectName">שם הפרויקט</label>
                    </FloatLabel>

                    <FloatLabel className="field">
                        <InputTextarea className="w-full md:w-14rem field" id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
                        <label htmlFor="description">מטרת הפרויקט</label>
                    </FloatLabel>

                    <FloatLabel className="field">
                        <Dropdown inputId="dd-demand" value={selectedDemandFactor} onChange={(e) => handelSelectDemandFactor(e.value)}
                            options={demandFactors} className="w-full md:w-14rem field" />
                        <label htmlFor="dd-demand">בחר גוף דורש</label>
                    </FloatLabel>

                    <FloatLabel className="field">
                        <Dropdown inputId="dd-type" value={selectedType} onChange={(e) => setSelectedType(e.value)}
                            options={types} className="w-full md:w-14rem field" />
                        <label htmlFor="dd-type">בחר סוג</label>
                    </FloatLabel>

                    <FloatLabel className="field">
                        <Dropdown inputId="dd-operating" value={selectedType == 'פנימי' ? selectedOperatingFactor : selectedOperatingCompany}
                            onChange={(e) => { selectedType == 'פנימי' ? handelSelectOperatingFactor(e.value) : handelSelectOperatingCompany(e.value) }}
                            options={selectedType == 'פנימי' ? demandFactors : operatingCompany} className="w-full md:w-14rem field" />
                        <label htmlFor="dd-operating">בחר גוף מבצע</label>
                    </FloatLabel>

                    <FloatLabel className="field">
                        <Dropdown inputId="dd-status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.value)}
                            options={statuses} className="w-full md:w-14rem field" />
                        <label htmlFor="dd-status">בחר סטטוס</label>
                    </FloatLabel>

                    {selectedStatus == 'עלה לאויר' &&
                        <FloatLabel className="field">
                            <Calendar inputId="dd-date" value={date} onChange={(e) => setDate(e.value)} showButtonBar touchUI className="w-full md:w-14rem field" />
                            <label htmlFor="dd-date">בחר תאריך</label>
                        </FloatLabel>
                    }

                    <div id="button">
                        <Button severity="secondary" label="הוסף" type="submit" onClick={addProject} />
                    </div>
                </form>

                <Dialog header="אזהרה ⚠️" visible={visible} style={{ width: '20%' }} onHide={() => setVisible(false)}>
                    <CheckMultipleName setVisible={setVisible} setProjectName={setProjectName}/>
                </Dialog>

                <Dialog header="הוספת גוף דורש " visible={hideAddDemand} onHide={() => { if (!hideAddDemand) return; setHideAddDemand(false); }}
                    footer={<AddDemandForm setSelected={setSelectedDemandFactor} setDemandFactors={setDemandFactors} hide={setHideAddDemand} demandFactors={demandFactors} />}>
                </Dialog>

                <Dialog header="הוספת גוף מבצע פנימי" visible={hideAddOperatingFactor} onHide={() => { if (!hideAddOperatingFactor) return; setHideAddOperatingFactor(false); }}
                    footer={<AddDemandForm setSelected={setSelectedOperatingFactor} setDemandFactors={setDemandFactors} hide={setHideAddOperatingFactor} demandFactors={demandFactors} />}>
                </Dialog>

                <Dialog header="הוספת גוף מבצע חיצוני" visible={hideAddOperatingCompany} onHide={() => { if (!hideAddOperatingCompany) return; setHideAddOperatingCompany(false); }}
                    footer={<AddOperatingForm setSelected={setSelectedOperatingCompany} setOperatingFactors={setOperatingCompany} hide={setHideAddOperatingCompany} operatingFactor={operatingCompany} />}>
                </Dialog>
            </div>
        </>
    );
};

export default AddProjectForm;
