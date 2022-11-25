import React, { useEffect } from 'react';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getColumns, selectColumnIds, selectColumns } from 'store/slices/columns/columnsSlice';
import { Column } from '../../../components/Column/Column';

export const ColumnsList = memo(() => {
  console.log('Column List rendered');
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const columnsIds = useAppSelector(selectColumnIds);
  const idInState = useAppSelector(selectColumns)[0]?.boardId;

  useEffect(() => {
    if (!columnsIds) {
      console.log('dont have state');
      dispatch(getColumns(id!));
    } else {
      if (idInState === id) return;
      console.log('have state but different');
      dispatch(getColumns(id!));
    }
  }, [dispatch, id]);

  return (
    <div className="board-page__columns-list">
      {columnsIds.map((id) => (
        <Column key={id} id={id} />
      ))}
    </div>
  );
});
