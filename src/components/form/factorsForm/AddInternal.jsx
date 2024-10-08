import React, { useContext, useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import '../projectForm/AddProjectForm.css';
import { createInternal } from "../../../services/InternalService";
import { ProjectContext } from "../../../services/ProjectContext";


export const AddInternal = ({ setProject, hide }) => {

    const {internals, setInternals} = useContext(ProjectContext);
    const [internal, setInternal]=useState({name:'',command:'',contact:'',department:'',phone:'',email:''})
    
    const submit = async (e) => {

        e.preventDefault()
        const ans = await createInternal(internal)
        await setInternals([...internals, ans])

        let updates = {require : ans ,requiresId: ans.id}
        setProject((prevProject) => ({ ...prevProject, ...updates}))

        hide(false);
    };
    

    return (<>
        <div id="addDemandFactorForm">
        <form action="" onSubmit={submit}>
            <div className="card field">
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputid="name" value={internal.name} onChange={(e) => setInternal((prevInternal) => ({...prevInternal, name: e.target.value}))} />
                    <label htmlFor="name">שם יחידה</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputid="command" value={internal.command} onChange={(e) => setInternal((prevInternal) => ({...prevInternal, command: e.target.value}))} />
                    <label htmlFor="command">אזור פיקוד</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputid="contact" value={internal.contact} onChange={(e) => setInternal((prevInternal) => ({...prevInternal, contact: e.target.value}))} />
                    <label htmlFor="contact">שם איש קשר</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputid="phone" value={internal.phone} onChange={(e) => setInternal((prevInternal) => ({...prevInternal, phone: e.target.value}))} />
                    <label htmlFor="phone">טלפון איש קשר</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputid="email" value={internal.email} onChange={(e) => setInternal((prevInternal) => ({...prevInternal, email: e.target.value}))} />
                    <label htmlFor="email">מייל איש קשר</label>
                </FloatLabel>
            </div>
            <div id="button">
                <Button severity="secondary" label="הוסף" />
            </div>
            </form>
        </div>
    </>)
};
