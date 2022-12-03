import React, { memo, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectAuthorizationFlag } from 'store/slices/auth/authSelectors';
import { selectBoardById } from 'store/slices/boards/boardsSelectors';
import { loadBoard } from 'store/slices/boards/boardsThunks';
import { toggleCreateColumnModal } from 'store/slices/modals/modalsSlice';
import { selectIsDark, selectLanguage } from 'store/slices/settings/settingsSelectors';
import { setOnBoard } from 'store/slices/user/userSlice';
import { ERoutes } from 'ts/enums';
import { ColumnsList } from './components/ColumnsList';
import { langConfig } from 'language/langConfig';

export const Board = memo(() => {
  const lang = useAppSelector(selectLanguage);

  const isAuth = useAppSelector(selectAuthorizationFlag);
  const { id } = useParams();
  const [error, setError] = useState('');
  const boardData = useAppSelector(selectBoardById(id!));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      dispatch(loadBoard(id!))
        .unwrap()
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [id, dispatch, boardData]);

  const isDark = useAppSelector(selectIsDark);

  const boardPageClass = isDark ? 'board-page-dark' : 'board-page';

  if (!isAuth) {
    return <Navigate to={`${ERoutes.singIn}?redirect=boards-${id}`} />;
  }

  if (error) {
    return (
      <div className={boardPageClass + '__container'}>
        <div className={boardPageClass + '__header'}>
          <button onClick={() => navigate(-1)} className="return-button">
            <svg width="10" height="16" viewBox="0 0 10 16">
              <path d="M8 16L0 8L8 0L9.42 1.42L2.84 8L9.42 14.58L8 16Z" />
            </svg>
          </button>
          <h3>{langConfig[error][lang]}</h3>
        </div>
      </div>
    );
  }

  if (!boardData) {
    return (
      <div className={boardPageClass + '__container'}>
        <div className={boardPageClass + '__header'}>
          <button onClick={() => navigate(-1)} className="return-button">
            <svg width="10" height="16" viewBox="0 0 10 16">
              <path d="M8 16L0 8L8 0L9.42 1.42L2.84 8L9.42 14.58L8 16Z" />
            </svg>
          </button>
          <h3>{langConfig.loading[lang]}</h3>
        </div>
      </div>
    );
  }

  const [title] = boardData.title.split('%');

  return (
    <div className={boardPageClass + '__container'}>
      <div className={boardPageClass + '__header'}>
        <button onClick={() => navigate(-1)} className="return-button">
          <svg width="10" height="16" viewBox="0 0 10 16">
            <path d="M8 16L0 8L8 0L9.42 1.42L2.84 8L9.42 14.58L8 16Z" />
          </svg>
        </button>
        <h3>{title}</h3>
        <button className="add-list-button" onClick={addColumnHandler}>
          {langConfig.addColumn[lang]} +
        </button>
      </div>
      <ColumnsList />
    </div>
  );
});
