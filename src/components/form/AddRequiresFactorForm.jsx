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

const AddRequiresFactorForm = ({setSelectedRequiresFactor}) => {

    const [factorName, setFactorName] = useState('');
    const [section,setSection]=useState('')


    const addRequiresFactor = (e) => {
        const factor = {}
        factor.factorName = factorName;
        factor.section = section;
        setSelectedRequiresFactor(factorName);
    };


    return (<>
        <div id="addRequiresFactorForm">
            <form action="">
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
                    <Button label="הוסף" type="submit" onClick={addRequiresFactor} />
                </div>
            </form>
        </div>
    </>)
};

export default AddRequiresFactorForm;
