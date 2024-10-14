import React, { useContext, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import '../projectForm/AddProjectForm.css';
import { createExternal } from "../../../services/ExternalsService";
import { ProjectContext } from "../../../services/ProjectContext";



export const AddExternal = ({ setProject, hide, toast }) => {
    const { externals, setExternals } = useContext(ProjectContext);
    const [external, setExternal] = useState({ name: '', image: '' });

    const addOperating = async (e) => {
        e.preventDefault()
        setExternal((prevExternal) => ({ ...prevExternal, image: external.name }))
        const formData = new FormData();
        formData.append("name", external.name);
        formData.append("image", external.image);
        const res = await createExternal(formData);
        const ans = res.data;
        await setExternals([...externals.slice(0, externals.length - 1), ans, ...externals.slice(externals.length - 1)])
        let updates = { external: ans, externalId: ans.id }
        setProject((prevProject) => ({ ...prevProject, ...updates }))
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'הגוף המבצע נוסף בהצלחה' });
        hide(false);
    };
    const handleFileUpload = (e) => {
        let selectedImage = e.files[0];
        setExternal((prevExternal) => ({ ...prevExternal, image: selectedImage }))
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
            </div>

            <div id="button">
                <Button severity="secondary" label="הוסף" onClick={addOperating} />
            </div>
        </div>
    </>)
}
