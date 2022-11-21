import React, { forwardRef, SyntheticEvent, useState } from 'react';
import { memo } from 'react';

export enum EInputTypes {
  text = 'text',
  password = 'password',
}

export enum EPattern {
  login = '^[A-Za-z_0-9]{2,15}$',
  name = '^[A-Za-z]{2,15}$',
  password = '[0-9a-zA-Z!@#$%^&*]{6,20}',
}

export enum EFormErrorMessages {
  login = 'Please enter norm login',
  name = 'Please enter norm name',
  password = 'Please enter norm password',
}

export interface IInputWithErrorMessage {
  type: EInputTypes;
  pattern: EPattern;
  placeholder?: string;
  className?: string;
  errorMessage: EFormErrorMessages;
  hook: {
    value: string;
    onChange: (e: SyntheticEvent<HTMLInputElement>) => void;
  };
}

export const InputWithErrorMessage = forwardRef<HTMLInputElement, IInputWithErrorMessage>(
  ({ type, className = 'input', placeholder, hook, pattern, errorMessage }, ref) => {
    const [isValid, setIsValid] = useState(true);

    const onBlur = (e: SyntheticEvent<HTMLInputElement>) => {
      const valid = e.currentTarget.checkValidity();
      setIsValid(valid);
    };

    const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
      hook.onChange(e);
      const valid = e.currentTarget.checkValidity();
      if (valid) setIsValid(valid);
    };

    const onInvalid = () => setIsValid(false);

    return (
      <div className="input-container">
        <input
          required
          ref={ref}
          className={isValid ? '' : 'input-error'}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          placeholder={' '}
          value={hook.value}
          onInvalid={onInvalid}
          pattern={pattern}
        />
        <label className={isValid ? '' : 'label-error'}>
          {isValid ? placeholder : errorMessage}
        </label>
      </div>
    );
  }
);
