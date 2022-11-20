import React, { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SmoothCorners } from 'react-smooth-corners';
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
      <SmoothCorners
        corners="22, 16"
        borderRadius="25px"
        as="div"
        className="block_transparent spl__central-container"
      >
        {children}
      </SmoothCorners>
    </div>
  );
});
