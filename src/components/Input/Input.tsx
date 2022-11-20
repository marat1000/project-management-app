import React, { useState } from 'react';
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

export interface IInput {
  type: EInputTypes;
  pattern: EPattern;
  placeholder?: string;
  className?: string;
  errorMessage: EFormErrorMessages;
  hook: {
    value: string;
    onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  };
}

export const InputWithErrorMessage = memo<IInput>(
  ({ type, className = 'input', placeholder, hook, pattern, errorMessage }) => {
    const validateOnBlur = ({ target }: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = target as HTMLInputElement;
      if (!new RegExp(pattern).test(value)) {
        setError(errorMessage);
      } else {
        setError(null);
      }
    };

    const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
      hook.onChange(e);
      const { value } = e.target as HTMLInputElement;
      if (new RegExp(pattern).test(value)) {
        setError(null);
      }
    };

    const [error, setError] = useState<null | string>(null);

    return (
      <div className="input-container">
        <input
          className={error ? 'input-error' : ''}
          onChange={onChange}
          onBlur={validateOnBlur}
          type={type}
          placeholder={' '}
          value={hook.value}
        />
        <label className={error ? 'label-error' : ''}>{error || placeholder}</label>
      </div>
    );
  }
);
