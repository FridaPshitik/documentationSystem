import React, { useContext, useState } from "react";

import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';

import { createInternal } from "../../services/InternalService";
import { ProjectContext } from "../../services/ProjectContext";
import { displayToast } from "../../services/toast"

import './Form.css';

export const AddInternal = ({ setProject, hide ,parent , toast}) => {
    const {internals, setInternals} = useContext(ProjectContext);
    const [internal, setInternal]=useState({name:'',command:'',contact:'',department:'',phone:'',email:''})
    const [formSubmitted, setFormSubmitted] = useState(false);

    const dataValidation = (data) => { 
        return data.name &&
            data.command &&
            data.contact &&
            data.phone &&
            data.email
    };
    
    const submit = async (event) => {
        event.preventDefault();

        if (dataValidation(internal)) {
            const res = await createInternal(internal);
            let updates;
            
            if(res.data){
                const ans = res.data;
                await setInternals([ ...internals.slice(0, internals.length - 1), ans, ...internals.slice(internals.length - 1)]);
                updates = (parent==='require'?  {require : ans ,requiresId: ans.id} :  {internal : ans ,internalId: ans.id});
                displayToast(toast, 'success', 'Success', ans.name+' נוסף בהצלחה');
            }

            else if(res.response.data.error){
                updates = (parent==='require'?  {require : null ,requiresId: null} :  {internal : null ,internalId: null});
                displayToast(toast, 'error', 'Error', res.response.data.error);
            }

            setProject((prevProject) => ({ ...prevProject, ...updates}));
            hide(false);
        }
        else{
            setFormSubmitted(true);
        }
    };
    

    return (<>
        <form action="" onSubmit={submit}>
            <div>
                <FloatLabel className="field">
                    <InputText className="input md:w-14rem field" inputid="name" value={internal.name} onChange={(e) => setInternal((prevInternal) => ({...prevInternal, name: e.target.value}))} />
                    <label htmlFor="name">שם יחידה</label>
                </FloatLabel>
                {formSubmitted && !internal.name && (
                    <Message severity="error" text="שדה זה הינו חובה" />
                )}
                <FloatLabel className="field">
                    <InputText className="input md:w-14rem field" inputid="command" value={internal.command} onChange={(e) => setInternal((prevInternal) => ({...prevInternal, command: e.target.value}))} />
                    <label htmlFor="command">אזור פיקוד</label>
                </FloatLabel>
                {formSubmitted && !internal.command && (
                    <Message severity="error" text="שדה זה הינו חובה" />
                )}
                <FloatLabel className="field">
                    <InputText className="input md:w-14rem field" inputid="contact" value={internal.contact} onChange={(e) => setInternal((prevInternal) => ({...prevInternal, contact: e.target.value}))} />
                    <label htmlFor="contact">שם איש קשר</label>
                </FloatLabel>
                {formSubmitted && !internal.contact && (
                    <Message severity="error" text="שדה זה הינו חובה" />
                )}
                <FloatLabel className="field">
                    <InputText className="input md:w-14rem field" inputid="phone" value={internal.phone} onChange={(e) => setInternal((prevInternal) => ({...prevInternal, phone: e.target.value}))} />
                    <label htmlFor="phone">טלפון איש קשר</label>
                </FloatLabel>
                {formSubmitted && !internal.phone && (
                    <Message severity="error" text="שדה זה הינו חובה" />
                )}
                <FloatLabel className="field">
                    <InputText className="input md:w-14rem field" inputid="email" value={internal.email} onChange={(e) => setInternal((prevInternal) => ({...prevInternal, email: e.target.value}))} />
                    <label htmlFor="email">מייל איש קשר</label>
                </FloatLabel>
                {formSubmitted && !internal.email && (
                    <Message severity="error" text="שדה זה הינו חובה" />
                )}
            </div>
            <div id="button">
                <Button severity="secondary" label="הוסף" />
            </div>
        </form>
    </>)
};
