import { useInput } from 'hooks/hooks';
import React, { forwardRef } from 'react';

export interface IInputTextArea {
  placeholder?: string;
  initialValue?: string;
}

export const InputTextArea = forwardRef<HTMLTextAreaElement, IInputTextArea>(
  ({ placeholder, initialValue }, ref) => {
    const value = useInput(initialValue);
    return (
      <div className="input-container">
        <textarea {...value} required ref={ref} placeholder={' '}></textarea>
        <label>{placeholder}</label>
      </div>
    );
  }
);
