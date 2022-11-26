import { EntityId } from '@reduxjs/toolkit';
import { EditTitleInput } from 'components/Input/editTitleInput';
import { EPattern } from 'components/Input/InputWithErrorMessage';
import React, { useCallback, useState } from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteColumn, selectColumnById, updateColumn } from 'store/slices/columns/columnsSlice';
import dots from '../Svg/dots.svg';
import AddingTask from './AddingTask/AddingTask';
import TasksList from './TasksList/TasksList';

export const Column = memo(({ id }: { id: EntityId }) => {
  const dispatch = useAppDispatch();
  const columnData = useAppSelector(selectColumnById(id));

  const [isEditing, setIsEditing] = useState(false);
  const [isEditPending, setIsEditPending] = useState(false);
  const { title, boardId, _id: columnId, order } = columnData!;

  const updateTitle = useCallback((value: string) => {
    setIsEditPending(true);
    dispatch(updateColumn({ title: value, columnId, boardId, order }))
      .unwrap()
      .then(() => setIsEditing(false))
      .finally(() => {
        setIsEditPending(false);
      });
  }, []);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const editColumn = useCallback(() => {
    setIsEditing(true);
  }, []);

  const deleteColumnHandler = () => {
    setIsEditPending(true);
    dispatch(deleteColumn({ boardId, columnId }))
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .finally(() => {
        setIsEditPending(false);
      });
  };

  return (
    <div className="column">
      {isEditing ? (
        <EditTitleInput
          submitHandler={updateTitle}
          cancelHandler={cancelEdit}
          deleteHandler={deleteColumnHandler}
          pattern={EPattern.name}
          initialValue={title}
          isLoading={isEditPending}
        />
      ) : (
        <header>{title}</header>
      )}

      <TasksList columnId={columnId} />
      <footer>
        <AddingTask columnId={id} />
        {!isEditing && (
          <button onClick={editColumn}>
            <img src={dots} />
          </button>
        )}
      </footer>
    </div>
  );
});
