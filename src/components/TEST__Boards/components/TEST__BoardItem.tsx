import { EntityId } from '@reduxjs/toolkit';
import { useInputExtended } from 'hooks/hooks';
import React, { useState } from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteBoard, selectBoardById, updateBoard } from 'store/slices/boardsSlice';

interface ITEST__BoardItemProps {
  id: EntityId;
}
// TODO only owner can edit
export const TEST__BoardItem = memo<ITEST__BoardItemProps>(({ id }) => {
  const boardData = useAppSelector(selectBoardById(id))!;
  const { title, isProcessed, _id } = boardData;
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const editInput = useInputExtended(title);

  const deleteHandler = () => {
    dispatch(deleteBoard(_id));
  };

  const applyEdit = () => {
    dispatch(
      updateBoard({
        ...boardData,
        title: editInput.bind.value,
      })
    );
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    editInput.setValue(title);
  };

  if (isEditing) {
    return (
      <div style={{ margin: 20 }}>
        <input {...editInput.bind} />
        <button onClick={applyEdit}> Apply </button>
        <button onClick={cancelEdit}> Cancel </button>
      </div>
    );
  }

  if (isProcessed) {
    return (
      <div style={{ margin: 20 }}>
        <span style={{ color: 'lightgray' }}>{title}</span>
        <span> LOADING </span>
      </div>
    );
  }

  return (
    <div style={{ margin: 20 }}>
      <span>{title}</span>
      <button onClick={deleteHandler}>DELETE</button>
      <button onClick={() => setIsEditing(true)}>EDIT</button>
    </div>
  );
});
