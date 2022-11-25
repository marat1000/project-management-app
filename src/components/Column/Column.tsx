import React from 'react';
import { memo } from 'react';
import { useAppDispatch } from 'store/hooks';
import { setInitialColumnValues } from 'store/slices/editColumn/editColumnSlice';
import { toggleEditColumnModal } from 'store/slices/modals/modalsSlice';
import { IColumn } from 'ts/interfaces';
import dots from '../Svg/dots.svg';

export const Column = memo(({ column: { title, boardId, _id } }: { column: IColumn }) => {
  const dispatch = useAppDispatch();

  const editColumn = () => {
    dispatch(toggleEditColumnModal(true));
    console.log(boardId);
    dispatch(setInitialColumnValues({ title, boardId, columnId: _id }));
  };
  return (
    <div className="column">
      <header>{title}</header>
      <footer>
        <button>Add +</button>
        <button>
          <img src={dots} onClick={editColumn} />
        </button>
      </footer>
    </div>
  );
});
