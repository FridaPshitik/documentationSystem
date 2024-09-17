import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import './AddProjectForm.css';


const AddDemandForm = ({ setSelectedDemandFactor, setDemandFactors, hide, demandFactors }) => {

    const [factorName, setFactorName] = useState('');
    const [section, setSection] = useState('')


    const addDemand = () => {
        setDemandFactors(demandFactors => [...demandFactors, section])
        setSelectedDemandFactor(section);
        const factor = {};
        factor.factorName = factorName;
        factor.section = section;
        hide(false);
    };


    return (<>
        <div id="addDemandFactorForm">
            <div className="card field">
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" id="factorName" value={factorName} onChange={(e) => setFactorName(e.target.value)} />
                    <label htmlFor="factorName">שם יחידה</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" id="section" value={section} onChange={(e) => setSection(e.target.value)} />
                    <label htmlFor="section">אזור פיקוד</label>
                </FloatLabel>
            </div>
            <div id="button">
                <Button severity="secondary" label="הוסף" type="submit" onClick={addDemand} />
            </div>
        </div>
    </>)
};

export default AddDemandForm;
