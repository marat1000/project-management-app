import React, { Dispatch, forwardRef, SetStateAction, SyntheticEvent, useState } from 'react';
import { EInputTypes, EPattern } from './InputWithErrorMessage';

export interface IEditInput {
  type: EInputTypes;
  pattern: EPattern;
  onChangeCb?: (e: SyntheticEvent<HTMLInputElement>) => void;
  initialValue?: string;
  onSubmit: () => void;
  deleteHandler: () => void;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export const EditTitleInput = forwardRef<HTMLInputElement, IEditInput>(
  ({ type, pattern, onSubmit, deleteHandler, onChangeCb, value, setValue }) => {
    const [isValid, setIsValid] = useState(true);

    const onChange = (e: SyntheticEvent<HTMLInputElement>) => {
      if (e.currentTarget.value.length > 16) return;
      setValue(e.currentTarget.value);
      onChangeCb && onChangeCb(e);
      if (!isValid) {
        setIsValid(e.currentTarget.checkValidity());
      }
    };

    const onBlur = (e: SyntheticEvent<HTMLInputElement>) => {
      // вместо кнопки дэлит срабатывает блюр(
      const valid = e.currentTarget.checkValidity();
      setIsValid(valid);
      console.log('blur');
      if (e.currentTarget.checkValidity()) {
        onSubmit();
      }
    };

    const onInvalid = () => setIsValid(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (e.currentTarget.checkValidity()) {
          onSubmit();
        }
      }
    };

    return (
      <div className="edit-input-container">
        <input
          autoFocus
          onKeyDown={handleKeyDown}
          required
          className={isValid ? 'edit-title-input' : 'edit-title-input-error'}
          onBlur={onBlur}
          type={type}
          onInvalid={onInvalid}
          pattern={pattern}
          value={value}
          onChange={onChange}
        />
        <button className="edit-input-container__delete" onClick={deleteHandler}>
          delete
        </button>
      </div>
    );
  }
);
