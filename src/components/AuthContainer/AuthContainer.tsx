import React, { memo, ReactNode } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';

interface IAuthContainerProps {
  children?: ReactNode;
  title: string;
}
export const AuthContainer = memo<IAuthContainerProps>(({ children, title }) => {
  const isDark = useAppSelector(selectIsDark);
  return (
    <div className="auth__container">
      <div className="auth__form">
        <h2 className="auth__title" style={isDark ? { color: '#D9D9D9' } : {}}>
          {title}
        </h2>
        {children}
      </div>
      <div className="auth__image"></div>
    </div>
  );
});
