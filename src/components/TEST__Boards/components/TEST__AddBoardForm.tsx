import { useInput } from 'hooks/hooks';
import React, { memo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { createBoard } from 'store/slices/boardsSlice';

export const TEST__AddBoardForm = memo(() => {
  const title = useInput();
  const dispatch = useAppDispatch();

  const create = () => {
    dispatch(createBoard({ title: title.value, users: [] }));
  };

  return (
    <div>
      <input placeholder="title" {...title} />
      <button onClick={create}>Create</button>
    </div>
  );
});
