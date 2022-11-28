import React, { memo, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectAuthorizationFlag } from 'store/slices/auth/authSelectors';
import { selectBoardById } from 'store/slices/boards/boardsSelectors';
import { loadBoard } from 'store/slices/boards/boardsThunks';
// import { setInitialColumnValues } from 'store/slices/editColumn/editColumnSlice';
import { toggleCreateColumnModal } from 'store/slices/modals/modalsSlice';
import { setOnBoard } from 'store/slices/user/userSlice';
import { ERoutes } from 'ts/enums';
import { ColumnsList } from './components/ColumnsList';
import { useTranslation } from 'react-i18next';

export const Board = memo(() => {
  const { t } = useTranslation();
  const message = {
    boardNotFound: t('boardNotFound'),
    unknownError: t('unknownError'),
    accessDenied: t(`accessDenied`),
  };
  const isAuth = useAppSelector(selectAuthorizationFlag);
  const { id } = useParams();
  const [isError, setIsError] = useState('');
  const boardData = useAppSelector(selectBoardById(id!));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const obj = {
    id,
    message,
  };

  const addColumnHandler = () => {
    dispatch(toggleCreateColumnModal(true));
  };

  useEffect(() => {
    dispatch(setOnBoard(id!));
  }, []);

  useEffect(() => {
    // if the user went to this page via a link,
    // he will not have this board in the store
    if (!boardData) {
      dispatch(loadBoard(obj))
        .unwrap()
        .catch((err) => {
          setIsError(err.message);
        });
    }
  }, [id, dispatch, boardData, obj]);

  if (!isAuth) {
    return <Navigate to={`${ERoutes.singIn}?redirect=boards-${id}`} />;
  }

  if (isError) {
    return (
      <div className="board-page__container">
        <div className="board-page__header">
          <button onClick={() => navigate(-1)} className="return-button">
            <svg width="10" height="16" viewBox="0 0 10 16">
              <path d="M8 16L0 8L8 0L9.42 1.42L2.84 8L9.42 14.58L8 16Z" />
            </svg>
          </button>
          <h3>{isError}</h3>
        </div>
      </div>
    );
  }

  if (!boardData) {
    return (
      <div className="board-page__container">
        <div className="board-page__header">
          <button onClick={() => navigate(-1)} className="return-button">
            <svg width="10" height="16" viewBox="0 0 10 16">
              <path d="M8 16L0 8L8 0L9.42 1.42L2.84 8L9.42 14.58L8 16Z" />
            </svg>
          </button>
          <h3>{t(`loading`)}</h3>
        </div>
      </div>
    );
  }

  const [title] = boardData.title.split('%');

  return (
    <div className="board-page__container">
      <div className="board-page__header">
        <button onClick={() => navigate(-1)} className="return-button">
          <svg width="10" height="16" viewBox="0 0 10 16">
            <path d="M8 16L0 8L8 0L9.42 1.42L2.84 8L9.42 14.58L8 16Z" />
          </svg>
        </button>
        <h3>{title}</h3>
        <button className="add-list-button" onClick={addColumnHandler}>
          {t(`addColumn`)} +
        </button>
      </div>
      <ColumnsList />
    </div>
  );
});
