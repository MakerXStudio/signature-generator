import React from 'react';

import SignatureContainer from '../SignatureContainer/SignatureContainer';

import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../slice';

import constants from '../constants';
import type { RootState } from '../store';
import type { Placeholders, Profile } from '../types';

type InputType = 'text' | 'email' | 'tel' | 'checkbox';

interface FieldLabel {
  label: string;
  type?: InputType;
  required?: boolean;
}

interface FormInput {
  text: string;
  order: number;
}

export const Form = () => {
  const dispatch = useDispatch();

  const placeholders = constants.placeholders;

  const labels: Record<keyof Profile, FieldLabel> = {
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

  let formInputs = {
    name: { text: '', order: 2 },
    pronoun: { text: '', order: 3 },
    title: { text: '', order: 4 },
    qualifications: { text: '', order: 5 },
    mobile: { text: '', order: 6 },
    email: { text: '', order: 7 },
    twitter: { text: '', order: 8 },
    addGPTW: { text: '', order: 9 },
  } satisfies Partial<Record<keyof Profile, FormInput>>;

  var profile = useSelector((state: RootState) => {
    return state.signature.profile;
  });

  const handleChange = (name: keyof Profile, value: Profile[keyof Profile]) => {
    dispatch(updateProfile({ name, value }));
  };

  const inputHtml = (
    inputName: keyof Profile,
    inputVal: Profile[keyof Profile] | undefined,
    placeholder: string | undefined,
    type: InputType = 'text'
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
    formInputs: Partial<Record<keyof Profile, FormInput>>,
    placeholders: Placeholders,
    values: Partial<Profile>
  ) => {
    return (Object.entries(formInputs) as [keyof Profile, FormInput][])
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
                  type
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
        <SignatureContainer {...profile} />
      </form>
    </div>
  );
};

export default Form;
