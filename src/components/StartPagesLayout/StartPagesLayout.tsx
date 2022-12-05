import React, { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { SmoothCorners } from 'react-smooth-corners';
import { useAppSelector } from 'store/hooks';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';
import { ERoutes } from 'ts/enums';

interface IStartPagesLayout {
  children?: ReactNode;
}

export const StartPagesLayout = memo<IStartPagesLayout>(({ children }) => {
  const isDark = useAppSelector(selectIsDark);
  return (
    <div className="spl__container">
      <header>
        <Link to={ERoutes.welcome}>Boardello</Link>
        <p>Приложение для управления проектами</p>
      </header>
      <SmoothCorners
        corners="22, 16"
        borderRadius="25px"
        as="div"
        // className="block_transparent spl__central-container"
        className={[
          isDark ? 'block_transparent-dark' : 'block_transparent',
          'spl__central-container',
        ].join(' ')}
      >
        {children}
      </SmoothCorners>
    </div>
  );
});
