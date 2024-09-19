import React, { useState, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import './AddProjectForm.css';


const AddOperatingForm = ({ setSelected, setOperatingFactors, hide, operatingFactor }) => {

    const toast = useRef(null);
    const [factorName, setFactorName] = useState('');
    const [image, setImage] = useState('');

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const addOperating = () => {
        setOperatingFactors(operatingFactors => [...operatingFactors, factorName])
        setSelected(factorName)
        const factor = {}
        factor.factorName = factorName;
        factor.image = image;
        hide(false)

    };
    return (<>
        <div id="addOperatingFactorForm">
            <div className="card field">
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" id="factorName" value={factorName} onChange={(e) => setFactorName(e.target.value)} />
                    <label htmlFor="factorName">שם</label>
                </FloatLabel>
                <div className="card flex justify-content-center b-color">
                    <Toast ref={toast}></Toast>
                    <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} chooseLabel="הוסף לוגו חברה" />
                </div>
            </div>

            <div id="button">
                <Button severity="secondary" label="הוסף" onClick={addOperating} />
            </div>
        </div>
    </>)
}
export default AddOperatingForm;