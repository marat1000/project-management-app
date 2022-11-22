import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { authSelector } from 'store/slices/authSlice';
import { toggleEditProfileModal } from 'store/slices/modalsSlice';
import { ERoutes } from 'ts/enums';
import { Button } from './Button/Button';

export const Header = memo(() => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(authSelector);
  if (!isAuth) return null;

  const openEditProfileModal = () => {
    dispatch(toggleEditProfileModal(true));
  };

  return (
    <header className="header">
      {' '}
      <nav>
        <NavLink to={ERoutes.welcome}>Welcome</NavLink>
        <NavLink to={ERoutes.main}>Main</NavLink>
        {isAuth && (
          <Button color="add" onClick={openEditProfileModal}>
            Profile
          </Button>
        )}
      </nav>
    </header>
  );
});
