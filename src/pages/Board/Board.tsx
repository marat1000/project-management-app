import React, { memo, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectAuthorizationFlag } from 'store/slices/auth/authSelectors';
import { selectBoardById } from 'store/slices/boards/boardsSelectors';
import { loadBoard } from 'store/slices/boards/boardsThunks';
import { getColumns } from 'store/slices/columns/columnsSlice';
import { setInitialColumnValues } from 'store/slices/editColumn/editColumnSlice';
import { toggleEditColumnModal } from 'store/slices/modals/modalsSlice';
import { ERoutes } from 'ts/enums';
import { ColumnsList } from './components/ColumnsList';

export const Board = memo(() => {
  const isAuth = useAppSelector(selectAuthorizationFlag);
  const { id } = useParams();
  const [isError, setIsError] = useState('');
  const boardData = useAppSelector(selectBoardById(id!));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addColumnHandler = () => {
    dispatch(toggleEditColumnModal(true));
    dispatch(setInitialColumnValues({ boardId: id }));
  };

  useEffect(() => {
    // if the user went to this page via a link,
    // he will not have this board in the store
    if (!boardData) {
      dispatch(loadBoard(id!))
        .unwrap()
        .catch((err) => {
          setIsError(err.message);
        });
    }
  }, [id]);

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
        <button onClick={() => navigate(-1)} className="return-button">
          <svg
            width="10"
            height="16"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 16L0 8L8 0L9.42 1.42L2.84 8L9.42 14.58L8 16Z" />
          </svg>
        </button>
        <h3>{title}</h3>
        <button className="add-list-button" onClick={addColumnHandler}>
          Add list +
        </button>
      </div>
      <ColumnsList />
    </div>
  );
});
