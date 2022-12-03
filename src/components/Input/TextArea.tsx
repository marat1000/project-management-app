import { useInputWithCb } from 'hooks/hooks';
import React, { forwardRef, SyntheticEvent } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';

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
    const isDark = useAppSelector(selectIsDark);
    return (
      <div className="input-container">
        <textarea
          style={isDark ? { color: '#D9D9D9' } : {}}
          {...value}
          required
          ref={ref}
          placeholder={' '}
        ></textarea>
        <label style={isDark ? { color: '#D9D9D9' } : {}}>{placeholder}</label>
      </div>
    );
  }
);
