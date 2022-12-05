import { Button } from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import { Modal } from 'components/Modals/Modal/Modal';
import { useInputWithCb } from 'hooks/hooks';
import React, { memo, SyntheticEvent, useRef, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';
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
    pattern = EPattern.title,
    type = EInputTypes.text,
    submitHandler,
    cancelHandler,
    deleteHandler,
    isLoading,
  }) => {
    const [isValid, setIsValid] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDelete, setIsDelete] = useState(false);

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

    const isDark = useAppSelector(selectIsDark);

    if (isDelete) {
      return (
        <>
          <Modal close={() => setIsDelete(false)} title={'Delete column?'}>
            {isLoading ? (
              <Loader />
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', gap: '15px' }}
              >
                <Button onClick={deleteHandler} color="add" isLoading={isLoading}>
                  Delete
                </Button>
                <Button onClick={() => setIsDelete(false)} isLoading={isLoading}>
                  Cancel
                </Button>
              </div>
            )}
          </Modal>
          <header>{initialValue}</header>
        </>
      );
    }

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
            style={isDark ? { color: '#D9D9D9' } : {}}
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
          <button className="delete" onClick={() => setIsDelete(true)} disabled={isLoading}>
            <span className="material-symbols-outlined"> delete </span>
          </button>
        )}
      </div>
    );
  }
);
