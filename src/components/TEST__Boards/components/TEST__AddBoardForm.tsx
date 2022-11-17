import { useInput } from 'hooks/hooks';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { createBoard, creatingBoardFlagsSelector } from 'store/slices/boardsSlice';

export const TEST__AddBoardForm = memo(() => {
  const title = useInput();
  const { /* error, */ isLoading } = useAppSelector(creatingBoardFlagsSelector);
  const dispatch = useAppDispatch();

  const create = () => {
    dispatch(createBoard({ title: title.value, users: [] }));
  };

  return (
    <div>
      <input placeholder="title" {...title} disabled={isLoading} />
      <button onClick={create} disabled={isLoading}>
        Create
      </button>
    </div>
  );
});
