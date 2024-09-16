import React, { useState ,useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Dialog } from "primereact/dialog";
import { Toast } from 'primereact/toast';

import 'primeicons/primeicons.css';
import './AddProjectForm.css';
import { CustomerService } from "../../services/CustomerService"
import { FileUpload } from 'primereact/fileupload';


const AddProjectForm = () => {

    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedRequiresFactor, setSelectedRequiresFactor] = useState(null);
    const [selectedOperatingFactor, setSelectedOperatingFactor] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const [visible, setVisible] = useState(false);
    const [hide, setHide] = useState(false);

    const requiresFactors = ['x', 'y', 'z', 'אחר'];
    const [operatingFactors,setOperatingFactors] =useState(['אחר','סקייבר', 'אלביט', 'צהל' ]) ;
    const statuses = ['באפיון', 'בפיתוח', 'בתהליך', 'עלה לאויר'];
    const types = ['פנימי', 'חיצוני'];

    const [factorName, setFactorName] = useState('');
    const [image, setImage] = useState('');
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
    const setVariable = (factorName) => {
        setSelectedOperatingFactor(factorName)
        setFactorName(factorName)
    }

    const addOperatingFactor = () => {
        setOperatingFactors(operatingFactors=>[...operatingFactors,factorName])
        const factor = {}
        factor.factorName = factorName;
        factor.image = image;
        setHide(false)

    };

    const addProject = () => {
        const project = {}
        project.projectName = projectName;
        project.description = description;
        project.requiresFactor = selectedRequiresFactor;
        project.operatingFactor = selectedOperatingFactor;
        project.type = selectedType;
        project.status = selectedStatus;
    };

    const handleValidation = (name) => {
        const data = CustomerService.getData();
        data.forEach(obj => {
            if (obj.name === name) {
                setVisible(true)
            }
        })
    };

    const addOperatingFactorForm = () => {
        return (<>
            <div id="addOperatingFactorForm">
                {/* <form action=""> */}
                <div className="card field">
                    <FloatLabel className="field">
                        <InputText className="w-full md:w-14rem field" id="factorName" value={factorName} onChange={(e) => setVariable(e.target.value)} />
                        <label htmlFor="factorName">שם</label>
                    </FloatLabel>
                </div>
                <div className="card flex justify-content-center">
                    <Toast ref={toast}></Toast>
                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />
                </div>
                <div id="button">
                    <Button label="הוסף" onClick={addOperatingFactor} />
                </div>
                {/* </form> */}
            </div>
        </>)
    }

    const handelSelectOperatingFactor = (value) => {
        if (value == 'אחר') {
            setHide(true)
        }
        else {
            setSelectedOperatingFactor(value)
        }
    }

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
                            <div style={{ direction: "ltr", marginTop: "10px" }} >
                                <Button label="כן" onClick={() => setVisible(false)} style={{ margin: "2px" }}></Button>
                                <Button label="לא" severity="secondary" style={{ margin: "2px" }} onClick={() => {
                                    setVisible(false)
                                    setProjectName('')
                                }} ></Button>
                            </div>
                        </Dialog>
                        <Dialog header="הוספת גוף מבצע " visible={hide} onHide={() => { if (!hide) return; setHide(false); }}
                            footer={addOperatingFactorForm}>
                        </Dialog>
                    </div>
                    <div className="card field">
                        <FloatLabel className="field">
                            <InputText className="w-full md:w-14rem field" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            <label htmlFor="description">תאור</label>
                        </FloatLabel>
                    </div>
                    <div className="card field">
                        <Dropdown value={selectedRequiresFactor} onChange={(e) => setSelectedRequiresFactor(e.value)} options={requiresFactors}
                            placeholder="בחר גוף דורש" className="w-full md:w-14rem field" />
                    </div>
                    <div className="card field">
                        <Dropdown value={selectedOperatingFactor} onChange={(e) => handelSelectOperatingFactor(e.value)} options={operatingFactors}
                            placeholder="בחר גוף מבצע" className="w-full md:w-14rem field" />
                    </div>
                    <div className="card field">
                        <Dropdown value={selectedStatus} onChange={(e) => setSelectedStatus(e.value)} options={statuses}
                            placeholder="בחר סטטוס" className="w-full md:w-14rem field" />
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
