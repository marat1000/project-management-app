import React, { memo, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectAuthorizationFlag } from 'store/slices/auth/authSelectors';
import { selectBoardById } from 'store/slices/boards/boardsSelectors';
import { loadBoard } from 'store/slices/boards/boardsThunks';
import { addColumn, getColumns, selectColumns } from 'store/slices/columns/columnsSlice';
import { ERoutes } from 'ts/enums';
import { ColumnsList } from './components/ColumnsList';

export const Board = memo(() => {
  const isAuth = useAppSelector(selectAuthorizationFlag);
  const { id } = useParams();
  const [isError, setIsError] = useState('');
  const boardData = useAppSelector(selectBoardById(id!));
  const dispatch = useAppDispatch();

  const columns = useAppSelector(selectColumns);

  const addColumnHandler = () => {
    dispatch(
      addColumn({
        id: id!,
        column: {
          // _id: 'Column id',
          title: 'Column title',
          order: 1,
          // boardId: id!,
        },
      })
    );
  };

  useEffect(() => {
    // if the user went to this page via a link,
    // he will not have this board in the store
    if (!boardData) {
      dispatch(loadBoard(id!))
        .unwrap()
        .then(() => {
          dispatch(getColumns(id!));
        })
        .catch((err) => {
          setIsError(err.message);
        });
    }
  }, [id]);

  // useEffect(() => {
  //   console.log('changed');
  //   dispatch(getColumns(id!));
  // }, [dispatch]);

  //http://localhost:3000/boards/637a5309e298276acbb19097
  if (!isAuth) {
    return <Navigate to={`${ERoutes.singIn}?redirect=boards-${id}`} />;
  }

  if (isError) {
    return <div>{isError}</div>;
  }

  if (!boardData) {
    return <div>Loading</div>;
  }

  const [title] = boardData.title.split('%');

  return (
    <div className="board-page__container">
      <div className="board-page__header">
        <h3>{title}</h3>
        <button onClick={addColumnHandler}> Add list +</button>
      </div>
      <ColumnsList columns={columns}></ColumnsList>
    </div>
  );
});
