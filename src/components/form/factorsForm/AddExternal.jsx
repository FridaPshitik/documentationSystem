import React, { useContext, useState } from "react";

import { FileUpload } from 'primereact/fileupload';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';

import { createExternal } from "../../../services/ExternalsService";
import { ProjectContext } from "../../../services/ProjectContext";
import { displayToast } from "../../../services/toast";
import '../projectForm/AddProjectForm.css';

export const AddExternal = ({ setProject, hide, toast }) => {

    const { externals, setExternals } = useContext(ProjectContext);
    const [external, setExternal] = useState({ name: '', image: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const dataValidation = (data) => { 
        return data.name &&
            data.image
    }

    const submit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("name", external.name);
        formData.append("image", external.image);

        if (dataValidation({"name":external.name, "image":external.image})) {
            setExternal((prevExternal) => ({ ...prevExternal, image: external.name }));

            const res = await createExternal(formData);
            let updates;
            
            if(res.data){
                const ans = res.data;
                await setExternals([...externals.slice(0, externals.length - 1), ans, ...externals.slice(externals.length - 1)]);
                updates = { external: ans, externalId: ans.id };
                displayToast(toast, 'success', 'Success', ans.name+' נוסף בהצלחה');
            }
    
            else if(res.response.data.error){
                updates= { external: null, externalId: null };
                displayToast(toast, 'error', 'Error', res.response.data.error);
            }
    
            setProject((prevProject) => ({ ...prevProject, ...updates}));
            hide(false);

        }
        else{
            setFormSubmitted(true);
        }
    };

    const handleFileUpload = (event) => {
        external.image = event.files[0].name;
        let selectedImage = event.files[0];
        setExternal((prevExternal) => ({ ...prevExternal, image: selectedImage }));
    };
    

    return (<>
        <div id="addOperatingFactorForm">
            <div className="card field">
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" id="factorName" value={external.name} onChange={(e) => setExternal((prevExternal) => ({ ...prevExternal, name: e.target.value }))} />
                    <label htmlFor="factorName">שם</label>
                </FloatLabel>
                <div className="card flex justify-content-center b-color">
                    <FileUpload mode="basic" customUpload="true" onSelect={handleFileUpload} chooseLabel="הוסף לוגו חברה" />
                </div>
                {formSubmitted && (
                    <Message severity="error" text="חובה למלא את כל השדות" />
                )}
            </div>

            <div id="button">
                <Button severity="secondary" label="הוסף" onClick={submit} />
            </div>
        </div>
    </>)
}
