import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import '../projectForm/AddProjectForm.css';


export const AddDemand = ({ setSelected, setDemandFactors, hide, demandFactors }) => {

    const [name, setName] = useState('');
    const [command, setCommand] = useState('')
    const [contact, setContact] = useState('');
    const [communication, setCommunication] = useState('');

    const addDemand = () => {
        setDemandFactors(demandFactors => [...demandFactors, command, contact, communication]);
        setSelected(command);
        const factor = {};
        factor.factorName = name;
        factor.section = command;
        factor.contactName = contact;
        factor.contactPhone = communication;
        //TODO Add demand to DB.
        hide(false);
    };


    return (<>
        <div id="addDemandFactorForm">
            <div className="card field">
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" id="factorName" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="factorName">שם יחידה</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" id="section" value={command} onChange={(e) => setCommand(e.target.value)} />
                    <label htmlFor="section">אזור פיקוד</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputId="contactName" value={contact} onChange={(e) => setContact(e.target.value)} />
                    <label htmlFor="contactName">שם איש קשר</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" inputId="contactPhone" value={communication} onChange={(e) => setCommunication(e.target.value)} />
                    <label htmlFor="contactPhone">טלפון איש קשר</label>
                </FloatLabel>
            </div>
            <div id="button">
                <Button severity="secondary" label="הוסף" type="submit" onClick={addDemand} />
            </div>
        </div>
    </>)
};
