import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import '../projectForm/AddProjectForm.css';


export const AddInternal = ({ setProject, hide }) => {

    const [require, setRequire]=useState({name:'',command:'',contact:'',communication:''})

console.log(require);
    const submit = () => {
        // setDemandFactors(demandFactors => [...demandFactors, command, contact, communication]);
        setProject((prevProject) => ({
            ...prevProject,
            require: require.command
        }))
        //TODO Add demand to DB.
        hide(false);
    };
    

    return (<>
        <div id="addDemandFactorForm">
        <form action="">
            <div className="card field">
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputid="name" value={require.name} onChange={(e) => setRequire((prevRequire) => ({...prevRequire, name: e.target.value}))} />
                    <label htmlFor="name">שם יחידה</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputid="command" value={require.command} onChange={(e) => setRequire((prevRequire) => ({...prevRequire, command: e.target.value}))} />
                    <label htmlFor="command">אזור פיקוד</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputid="contact" value={require.contact} onChange={(e) => setRequire((prevRequire) => ({...prevRequire, contact: e.target.value}))} />
                    <label htmlFor="contact">שם איש קשר</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputid="communication" value={require.communication} onChange={(e) => setRequire((prevRequire) => ({...prevRequire, communication: e.target.value}))} />
                    <label htmlFor="communication">טלפון איש קשר</label>
                </FloatLabel>
            </div>
            <div id="button">
                <Button severity="secondary" label="הוסף" type="submit" onClick={submit} />
            </div>
            </form>
        </div>
    </>)
};
