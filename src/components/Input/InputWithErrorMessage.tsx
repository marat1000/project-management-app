import { useInputWithCb } from 'hooks/hooks';
import React, { forwardRef, SyntheticEvent, useState } from 'react';

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
  errorMessage: EFormErrorMessages;
  onChangeCb?: (e: SyntheticEvent<HTMLInputElement>) => void;
}

export const InputWithErrorMessage = forwardRef<HTMLInputElement, IInputWithErrorMessage>(
  ({ type, placeholder, pattern, errorMessage, onChangeCb }, ref) => {
    const [isValid, setIsValid] = useState(true);
    const bind = useInputWithCb((e) => {
      onChangeCb && onChangeCb(e);
      if (!isValid) {
        setIsValid(e.currentTarget.checkValidity());
      }
    });

    const onBlur = (e: SyntheticEvent<HTMLInputElement>) => {
      const valid = e.currentTarget.checkValidity();
      setIsValid(valid);
    };

    const onInvalid = () => setIsValid(false);

    return (
      <div className="input-container">
        <input
          required
          ref={ref}
          className={isValid ? '' : 'input-error'}
          onBlur={onBlur}
          type={type}
          placeholder={' '}
          onInvalid={onInvalid}
          pattern={pattern}
          {...bind}
        />
        <label className={isValid ? '' : 'label-error'}>
          {isValid ? placeholder : errorMessage}
        </label>
      </div>
    );
  }
);
