import { useInputWithCb } from 'hooks/hooks';
import React, { memo, SyntheticEvent, useRef, useState } from 'react';
import { EInputTypes, EPattern } from './InputWithErrorMessage';

export interface IEditInput {
  type?: EInputTypes;
  pattern?: EPattern;
  onChangeCb?: (e: SyntheticEvent<HTMLInputElement>) => void;
  initialValue?: string;
  submitHandler?: (value: string) => void;
  cancelHandler?: () => void;
  deleteHandler?: () => void;
  isLoading?: boolean;
}

export const EditTitleInput = memo<IEditInput>(
  ({
    initialValue = '',
    onChangeCb,
    pattern = '',
    type = EInputTypes.text,
    submitHandler,
    cancelHandler,
    deleteHandler,
    isLoading,
  }) => {
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    const input = useInputWithCb((e) => {
      onChangeCb && onChangeCb(e);
    }, initialValue);

    const onInvalid = () => setIsValid(false);

    const handleSubmit = () => {
      if (!inputRef.current) return;
      const valid = inputRef.current.checkValidity();
      if (valid) {
        submitHandler && submitHandler(inputRef.current.value);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    return (
      <div className="edit-input">
        <div className={isValid ? 'edit-input-container' : 'edit-input-container error'}>
          <input
            disabled={isLoading}
            autoFocus
            onKeyDown={handleKeyDown}
            required
            className={isValid ? 'edit-title-input' : 'edit-title-input-error'}
            type={type}
            onInvalid={onInvalid}
            pattern={pattern}
            ref={inputRef}
            {...input}
          />
          {submitHandler && (
            <button className="submit" onClick={handleSubmit} disabled={isLoading}>
              <span className="material-symbols-outlined"> done </span>
            </button>
          )}
          {cancelHandler && (
            <button className="cancel" onClick={cancelHandler} disabled={isLoading}>
              <span className="material-symbols-outlined"> close </span>
            </button>
          )}
        </div>
        {deleteHandler && (
          <button className="delete" onClick={deleteHandler} disabled={isLoading}>
            <span className="material-symbols-outlined"> delete </span>
          </button>
        )}
      </div>
    );
  }
);
