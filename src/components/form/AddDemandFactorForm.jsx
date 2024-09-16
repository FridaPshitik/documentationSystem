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

const AddDemandFactorForm = ({ setSelectedDemandFactor, setDemandFactors, hide, demandFactors }) => {

    const [factorName, setFactorName] = useState('');
    const [section, setSection] = useState('')


    const addDemandFactor = () => {
        setDemandFactors(demandFactors => [...demandFactors, factorName])
        setSelectedDemandFactor(factorName);
        hide(false);
        const factor = {};
        factor.factorName = factorName;
        factor.section = section;
    };


    return (<>
        <div id="addRequiresFactorForm">
            {/* <form action=""> */}
            <div className="card field">
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" id="factorName" value={factorName} onChange={(e) => setFactorName(e.target.value)} />
                    <label htmlFor="factorName">שם</label>
                </FloatLabel>
                <FloatLabel className="field">
                    <InputText className="w-full md:w-14rem field" id="section" value={section} onChange={(e) => setSection(e.target.value)} />
                    <label htmlFor="section">אזור</label>
                </FloatLabel>
            </div>
            <div id="button">
                <Button label="הוסף" type="submit" onClick={addDemandFactor} />
            </div>
            {/* </form> */}
        </div>
    </>)
};

export default AddDemandFactorForm;
