import React, { useEffect, useState } from 'react';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getColumns, selectColumnIds, selectColumns } from 'store/slices/columns/columnsSlice';
import { Column } from '../../../components/Column/Column';

export const ColumnsList = memo(() => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const columnsIds = useAppSelector(selectColumnIds);
  const [isLoading, setIsLoading] = useState(true);
  const idInState = useAppSelector(selectColumns)[0]?.boardId;

  useEffect(() => {
    if (!columnsIds || idInState !== id) {
      dispatch(getColumns(id!))
        .unwrap()
        .then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board-page__columns-list">
      {columnsIds.map((id) => (
        <Column key={id} id={id} />
      ))}
    </div>
  );
});
