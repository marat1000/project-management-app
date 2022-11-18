import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { ERoutes } from 'ts/enums';

export const Header = memo(() => {
  return (
    <header className="header">
      {' '}
      <nav>
        <NavLink to={ERoutes.welcome}>Welcome</NavLink>
        <NavLink to={ERoutes.main}>Main</NavLink>
        <NavLink to={ERoutes.profile}>Profile</NavLink>
      </nav>
    </header>
  );
});
