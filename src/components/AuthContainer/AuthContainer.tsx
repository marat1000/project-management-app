import { CentralContainer } from 'components/CentralContainer/CentralContainer';
import React, { memo, ReactNode } from 'react';

interface IAuthContainerProps {
  children?: ReactNode;
  title: string;
}
export const AuthContainer = memo<IAuthContainerProps>(({ children, title }) => {
  return (
    <>
      <div className="auth__container">
        <div className="auth__form">
          <h2 className="auth__title">{title}</h2>
          {children}
        </div>
        <div className="auth__image">Image</div>
      </div>
    </>
  );
});
