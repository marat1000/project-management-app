import { EntityId } from '@reduxjs/toolkit';
import React from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectColumnById } from 'store/slices/columns/columnsSlice';
import { setInitialColumnValues } from 'store/slices/editColumn/editColumnSlice';
import { toggleEditColumnModal } from 'store/slices/modals/modalsSlice';
import dots from '../Svg/dots.svg';

export const Column = memo(({ id }: { id: EntityId }) => {
  const dispatch = useAppDispatch();
  const columnData = useAppSelector(selectColumnById(id));

  if (!columnData) {
    return <div>Error</div>;
  }

  const { title, boardId, _id: columnId, order } = columnData;

  const editColumn = () => {
    dispatch(toggleEditColumnModal(true));
    dispatch(
      setInitialColumnValues({
        title,
        boardId,
        columnId,
      })
    );
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
