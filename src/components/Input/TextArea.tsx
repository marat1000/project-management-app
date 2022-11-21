import React, { forwardRef } from 'react';

export interface IInputTextArea {
  placeholder?: string;
}

export const InputTextArea = forwardRef<HTMLTextAreaElement, IInputTextArea>(
  ({ placeholder }, ref) => {
    return (
      <div className="input-container">
        <textarea required ref={ref} placeholder={' '} />
        <label>{placeholder}</label>
      </div>
    );
  }
);
