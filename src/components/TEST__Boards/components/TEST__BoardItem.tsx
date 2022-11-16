import { EntityId } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { deleteBoard, selectBoardById } from 'store/slices/boardsSlice';

interface ITEST__BoardItemProps {
  id: EntityId;
}

export const TEST__BoardItem = memo<ITEST__BoardItemProps>(({ id }) => {
  const data = useAppSelector(selectBoardById(id))!;
  const dispatch = useAppDispatch();
  //here we can use local state, because api doesn't return errors
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHandler = () => {
    setIsDeleting(true);
    dispatch(deleteBoard(data._id));
  };

  if (isDeleting) {
    return (
      <div style={{ margin: 20 }}>
        <span style={{ color: 'lightgray' }}>{data?.title}</span>
        <span> Deleting... </span>
      </div>
    );
  }

  return (
    <div style={{ margin: 20 }}>
      <span>{data?.title}</span>
      <button onClick={deleteHandler}>DELETE</button>
    </div>
  );
});
