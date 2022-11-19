import { CentralContainer } from 'components/CentralContainer/CentralContainer';
import React, { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ERoutes } from 'ts/enums';

interface IStartPagesLayout {
  children?: ReactNode;
}

export const StartPagesLayout = memo<IStartPagesLayout>(({ children }) => {
  return (
    <div className="spl__container">
      <header>
        <Link to={ERoutes.welcome}>Boardello</Link>
      </header>
      <CentralContainer>{children}</CentralContainer>
    </div>
  );
});
