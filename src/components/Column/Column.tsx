import React from 'react';
import { memo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { deleteColumn } from 'store/slices/columns/columnsSlice';
import { IColumn } from 'ts/interfaces';
import dots from '../Svg/dots.svg';

export const Column = memo(({ column: { title, boardId, _id } }: { column: IColumn }) => {
  const dispatch = useAppDispatch();

  const deleteC = () => {
    dispatch(deleteColumn({ boardID: boardId, columnID: _id }));
  };
  return (
    <div className="column">
      <header>{title}</header>
      <footer>
        <button>Add +</button>
        <button>
          <img src={dots} onClick={deleteC} />
        </button>
      </footer>
    </div>
  );
});
