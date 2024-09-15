import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";

import 'primeicons/primeicons.css';
import './AddProjectForm.css';
import {CustomerService} from "../../services/CustomerService"

const AddProjectForm = () => {

    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFactor, setSelectedFactor] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [date, setDate] = useState('');
    const [selectedType, setSelectedType] = useState(null);
    
    const [visible, setVisible] = useState(false);

    const factors = ['סקייבר', 'אלביט', 'צהל'];
    const statuses = ['באפיון', 'בפיתוח', 'בתהליך', 'עלה לאויר'];
    const types = ['פנימי', 'חיצוני'];

    const addProject = () => {
        const project = {}
        project.projectName = projectName;
        project.description = description;
        project.factor = selectedFactor;
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

    return (
        <>
            <div id="addProjectForm">
                <form action="">
                    <div className="card field">
                        <FloatLabel className="field">
                            <InputText className="w-full md:w-14rem field" id="projectName" value={projectName} onChange={(e) => {
                                setProjectName(e.target.value)
                                handleValidation(e.target.value)
                            }} />
                            <label htmlFor="projectName">שם הפרויקט</label>
                        </FloatLabel>
                        <Dialog header="אזהרה ⚠️" visible={visible} style={{ width: '20%' }} onHide={() => setVisible(false)}>
                            <p className="m-0">
                                כבר קיים פרויקט בשם זה. 
                                <br></br>
                                האם אתה בטוח שברצונך להמשיך?
                            </p>
                            <div style={{ direction: "ltr" ,marginTop:"10px" }} >
                                <Button label="כן" onClick={() => setVisible(false)} style={{ margin: "2px"}}></Button>
                                <Button label="לא" severity="secondary" style={{ margin: "2px"}} onClick={() => {
                                    setVisible(false)
                                    setProjectName('')
                                }} ></Button>
                            </div>
                        </Dialog>
                    </div>
                    <div className="card field">
                        <FloatLabel className="field">
                            <InputText className="w-full md:w-14rem field" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <label htmlFor="description">תאור</label>
                        </FloatLabel>
                    </div>
                    <div className="card field">
                        <Dropdown value={selectedFactor} onChange={(e) => setSelectedFactor(e.value)} options={factors}
                            placeholder="בחר גוף מבצע" className="w-full md:w-14rem field" />
                    </div>
                    <div className="card field">
                        <Dropdown value={selectedStatus} onChange={(e) => setSelectedStatus(e.value)} options={statuses}
                            placeholder="בחר סטטוס" className="w-full md:w-14rem field" />
                    </div>
                    <div className="card field">
                        <Calendar className="w-full md:w-14rem" id="calendar" value={date} onChange={(e) => setDate(e.value)} dateFormat="mm/dd/yy" placeholder="תאריך עליה לאויר" showIcon />
                    </div>
                    <div className="card field">
                        <Dropdown value={selectedType} onChange={(e) => setSelectedType(e.value)} options={types}
                            placeholder="בחר סוג" className="w-full md:w-14rem field" />
                    </div>
                    <div id="button">
                        <Button label="הוסף" type="submit" onClick={addProject} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProjectForm;
