import { EntityId } from '@reduxjs/toolkit';
import React, { memo, useReducer, useRef, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';
import { selectTaskById } from 'store/slices/tasks/tasksSelector';
import { TaskUsersList } from './TaskUsers/TaskUsers';

interface IEditingTaskProps {
  id?: EntityId;
  isUpdating: boolean;
  cancel: () => void;
  deleteHandler?: () => void;
  submit: (title: string, description: string, users: EntityId[]) => void;
}

export type TTaskUsersAction = {
  type: 'addUser' | 'removeUser';
  payload: EntityId;
};

const taskUserReducer = (state: EntityId[], action: TTaskUsersAction) => {
  switch (action.type) {
    case 'addUser':
      return [...state, action.payload];
    case 'removeUser':
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
};

export const EditingTask = memo<IEditingTaskProps>(
  ({ id, cancel, deleteHandler, submit, isUpdating }) => {
    const taskData = useAppSelector(selectTaskById(id || 0));
    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isDescriptionValid, setIsDescriptionValid] = useState(true);

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const [taskUsers, dispatch] = useReducer(taskUserReducer, taskData?.users || []);

    const submitHandler = () => {
      if (!titleRef.current || !descriptionRef.current) return;

      const isTitleValid = titleRef.current.checkValidity();
      const isDescriptionValid = descriptionRef.current.checkValidity();

      if (isTitleValid && isDescriptionValid) {
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        submit(title, description, taskUsers);
      }
    };

    const isDark = useAppSelector(selectIsDark);
    const mainClassName = isDark ? 'edit-task-dark' : 'edit-task';

    return (
      <div className={mainClassName}>
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
        <TaskUsersList taskUsers={taskUsers} dispatch={dispatch} disabled={isUpdating} />
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
