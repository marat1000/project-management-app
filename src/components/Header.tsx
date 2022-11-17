import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../common/constants';

export const Header = memo(() => {
  return (
    <header className="header">
      {' '}
      <nav>
        <NavLink to={ROUTES.welcome}>Welcome</NavLink> <NavLink to={ROUTES.main}>Main</NavLink>
      </nav>
    </header>
  );
});
