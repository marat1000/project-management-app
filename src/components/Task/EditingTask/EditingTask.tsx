import { EntityId } from '@reduxjs/toolkit';
import { useInput } from 'hooks/hooks';
import React, { memo, useRef, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectTaskById } from 'store/slices/tasks/tasksSelector';

interface IEditingTaskProps {
  id?: EntityId;
  isUpdating: boolean;
  cancel: () => void;
  deleteHandler?: () => void;
  submit: (title: string, description: string, users: EntityId[]) => void;
}
export const EditingTask = memo<IEditingTaskProps>(
  ({ id, cancel, deleteHandler, submit, isUpdating }) => {
    const taskData = useAppSelector(selectTaskById(id || 0));
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const submitHandler = () => {
      if (!titleRef.current || !descriptionRef.current) return;

      const isTitleValid = titleRef.current.checkValidity();
      const isDescriptionValid = descriptionRef.current.checkValidity();

      if (isTitleValid && isDescriptionValid) {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        submit(title, description, []);
      }
    };

    return (
      <div className="edit-task">
        <input
          disabled={isUpdating}
          className={isTitleValid ? '' : 'invalid'}
          ref={titleRef}
          required
          defaultValue={taskData?.title || ''}
          onInvalid={() => setIsTitleValid(false)}
          onChange={() => setIsTitleValid(true)}
        />
        <textarea
          disabled={isUpdating}
          className={isDescriptionValid ? '' : 'invalid'}
          onInvalid={() => setIsDescriptionValid(false)}
          onChange={() => setIsDescriptionValid(true)}
          ref={descriptionRef}
          required
          defaultValue={taskData?.description || ''}
        />
        <footer>
          <button onClick={submitHandler} className="accept" disabled={isUpdating}>
            <span className="material-symbols-outlined"> done </span>
          </button>
          <button onClick={cancel} className="cancel" disabled={isUpdating}>
            <span className="material-symbols-outlined"> close </span>
          </button>
          {deleteHandler && (
            <button onClick={deleteHandler} className="delete" disabled={isUpdating}>
              <span className="material-symbols-outlined"> delete </span>
            </button>
          )}
        </footer>
      </div>
    );
  }
);
