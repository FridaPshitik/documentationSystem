import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Button } from 'primereact/button';

import { createInternal } from '../../services/InternalService';
import { ProjectContext } from '../../services/ProjectContext';
import { displayToast } from '../../services/toast';

import './Form.css';

export const AddInternal = ({ setProject, hide, parent, toast }) => {
  const { internals, setInternals } = useContext(ProjectContext);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});


  const submit = async (data) => {
    data.department = '';
    const res = await createInternal(data);
    let updates;

    if (res.data) {
      const ans = res.data;
      await setInternals([...internals.slice(0, internals.length - 1), ans, ...internals.slice(internals.length - 1)]);
      updates = (parent === 'require' ? { require: ans, requiresId: ans.id } : { internal: ans, internalId: ans.id });
      displayToast(toast, 'success', 'Success', ans.name + ' נוסף בהצלחה');
    }

    else if (res.response.data.error) {
      updates = (parent === 'require' ? { require: null, requiresId: null } : { internal: null, internalId: null });
      displayToast(toast, 'error', 'Error', res.response.data.error);
    }

    setProject((prevProject) => ({ ...prevProject, ...updates }));
    hide(false);
  };

  return (<>
    <form action='' noValidate onSubmit={handleSubmit(submit)}>
      <div>
        <div className='gap'>
          <FloatLabel className='field'>
            <InputText id='name' aria-describedby="name-help" className='input md:w-14rem field'
              type='name'
              {...register('name', {
                required: { value: true, message: '  שם יחידה הינו שדה חובה  ' },
              })} />
            <label htmlFor='name'>שם יחידה</label>
          </FloatLabel>
          {errors.name && (
            <Message id="name-help" severity='error' text={errors.name.message} />
          )}
        </div>
        
        <div className='gap'>
          <FloatLabel className='field'>
            <InputText id='command' aria-describedby="command-help" className='input md:w-14rem field'
              type='command'
              {...register('command', {
                required: { value: true, message: 'אזור פיקוד הינו שדה חובה' },
              })} />
            <label htmlFor='command'>אזור פיקוד</label>
          </FloatLabel>
          {errors.command && (
            <Message id="command-help" severity='error' text={errors.command.message} />
          )}
        </div>

        <div className='gap'>
          <FloatLabel className='field'>
            <InputText id='contact' aria-describedby="contact-help" className='input md:w-14rem field'
              type='contact'
              {...register('contact', {
                required: { value: true, message: '  שם איש קשר הינו שדה חובה  ' },
              })} />
            <label htmlFor='contact'>שם איש קשר</label>
          </FloatLabel>
          {errors.contact && (
            <Message id="contact-help" severity='error' text={errors.contact.message} />
          )}
        </div>

        <div className='gap'>
          <FloatLabel className='field'>
            <InputText id='phone' aria-describedby="phone-help" className='input md:w-14rem field'
              type='phone'
              {...register('phone', {
                required: { value: true, message: '  טלפון הינו שדה חובה  ' },
                type: { String: true },
                phone: { value: true, message: 'טלפון לא חוקי ' },
                pattern: {
                  value: /^\d{10}$/,
                  message: ' טלפון לא חוקי '
                }
              })} />
            <label htmlFor='phone'>טלפון איש קשר</label>
          </FloatLabel>
          {errors.phone && (
            <Message id="phone-help" severity='error' text={errors.phone.message} />
          )}
        </div>

        <div className='gap'>
          <FloatLabel className='field'>
            <InputText id='email' placeholder="me@example.com" aria-describedby="email-help" className='input md:w-14rem field'
              type='email'
              {...register('email', {
                required: { value: true, message: '  אימייל הינו  חובה  ' },
                // email: { value: true, message: ' כתובת אימייל לא חוקית ' },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  // value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: ' כתובת אימייל לא חוקית '
                }
              })} />
            <label htmlFor='email'>מייל איש קשר</label>
          </FloatLabel>
          {errors.email && (
            <Message id="email-help" severity='error' text={errors.email.message} />
          )}
        </div>

      </div>
      <div id='button'>
        <Button severity='secondary' label='הוסף' />
      </div>
    </form>
  </>);
};
