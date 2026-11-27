import React from 'react';
import './Form.scss';

import SignatureContainer from '../SignatureContainer/SignatureContainer';

import { useAppDispatch, useAppSelector } from '../hooks';
import { updateProfile } from '../slice';
import type { Profile } from '../types';

import constants from '../constants';

type InputName = Extract<
  keyof Profile,
  | 'name'
  | 'pronoun'
  | 'title'
  | 'qualifications'
  | 'mobile'
  | 'email'
  | 'twitter'
  | 'addGPTW'
>;
type FormInput = { text: string; order: number };
type FormInputs = Record<InputName, FormInput>;
type Labels = Record<
  InputName | 'phone',
  { label: string; type?: string; required?: boolean }
>;

export const Form = () => {
  const dispatch = useAppDispatch();

  const placeholders: Partial<Record<keyof Profile, string>> =
    constants.placeholders;

  const labels: Labels = {
    name: { label: 'Your Name', required: true },
    pronoun: { label: 'Your Pronouns' },
    title: { label: 'Job Title' },
    email: { label: 'Email', type: 'email', required: true },
    phone: { label: 'Phone', type: 'tel' },
    mobile: { label: 'Mobile', type: 'tel', required: true },
    twitter: { label: 'Twitter' },
    qualifications: { label: 'Qualifications' },
    addGPTW: { label: 'Add GPTW', type: 'checkbox' },
  };

  let formInputs: FormInputs = {
    name: { text: '', order: 2 },
    pronoun: { text: '', order: 3 },
    title: { text: '', order: 4 },
    qualifications: { text: '', order: 5 },
    mobile: { text: '', order: 6 },
    email: { text: '', order: 7 },
    twitter: { text: '', order: 8 },
    addGPTW: { text: '', order: 9 },
  };

  var profile = useAppSelector((state) => {
    return state.signature.profile;
  });

  const handleChange = (name: keyof Profile, value: string | boolean) => {
    dispatch(updateProfile({ name, value }));
  };

  const inputHtml = (
    inputName: keyof Profile,
    inputVal: string | boolean | undefined,
    placeholder: string | undefined,
    type = 'text',
  ) => {
    if (type === 'checkbox') {
      return (
        <input
          id={`input-${inputName}`}
          type={type}
          className="mt-3"
          checked={typeof inputVal === 'boolean' ? inputVal : undefined}
          onChange={(e) => handleChange(inputName, e.target.checked)}
        />
      );
    }
    return (
      <input
        id={`input-${inputName}`}
        className="input"
        type={type}
        placeholder={placeholder}
        style={{ width: '300px' }}
        value={typeof inputVal === 'string' ? inputVal : ''}
        onChange={(e) => handleChange(inputName, e.target.value)}
      />
    );
  };

  const renderHtmlForInputs = (
    formInputs: FormInputs,
    placeholders: Partial<Record<keyof Profile, string>>,
    values: Profile,
  ) => {
    return (Object.entries(formInputs) as [InputName, FormInput][])
      .sort((a, b) => a[1].order - b[1].order)
      .map(([key, { order, ...rest }]) => ({ key, ...rest }))
      .map((inputObj) => {
        const inputName = inputObj.key;
        const { label, type = 'text', required = false } = labels[inputName];
        return (
          <div className="field is-horizontal" key={inputName}>
            <div className="field-label is-normal">
              <label
                className="label field-label"
                htmlFor={`input-${inputName}`}
              >
                {label}
                {required ? (
                  <span title="Required" style={{ color: 'red' }}>
                    *
                  </span>
                ) : null}
              </label>
            </div>
            <div className="field-body">
              <div className="control">
                {inputHtml(
                  inputName,
                  values[inputName],
                  placeholders[inputName],
                  type,
                )}
              </div>
            </div>
          </div>
        );
      });
  };

  const inputs = renderHtmlForInputs(formInputs, placeholders, profile);

  return (
    <div className="content">
      <h3 className="title">Your details</h3>
      <form>
        {inputs}
        <hr />
        <SignatureContainer />
      </form>
    </div>
  );
};

export default Form;
