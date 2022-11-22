import { useInputWithCb } from 'hooks/hooks';
import React, { forwardRef, SyntheticEvent } from 'react';

export interface IInputTextArea {
  placeholder?: string;
  initialValue?: string;
  onChangeCb?: (e: SyntheticEvent<HTMLTextAreaElement>) => void;
}

export const InputTextArea = forwardRef<HTMLTextAreaElement, IInputTextArea>(
  ({ placeholder, initialValue, onChangeCb }, ref) => {
    const value = useInputWithCb<HTMLTextAreaElement>((e) => {
      onChangeCb && onChangeCb(e);
    }, initialValue);
    return (
      <div className="input-container">
        <textarea {...value} required ref={ref} placeholder={' '}></textarea>
        <label>{placeholder}</label>
      </div>
    );
  }
);
