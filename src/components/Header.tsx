import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { authSelector } from 'store/slices/authSlice';
import { ERoutes } from 'ts/enums';

export const Header = memo(() => {
  const isAuth = useAppSelector(authSelector);
  if (!isAuth) return null;

  return (
    <header className="header">
      {' '}
      <nav>
        <NavLink to={ERoutes.welcome}>Welcome</NavLink>
        <NavLink to={ERoutes.main}>Main</NavLink>
        {isAuth && <NavLink to={ERoutes.profile}>Profile</NavLink>}
      </nav>
    </header>
  );
});
