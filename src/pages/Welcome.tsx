import React, { memo, ReactNode } from 'react';
import { TEST__Registration } from '../components/TEST__Registration';
import { TEST__Login } from '../components/TEST__Login';
import { useAppSelector } from '../store/hooks';
import { authSelector } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';
import { ERoutes } from 'ts/enums';

const style = {
  display: 'flex',
  // justifyContent: 'flex-end',
};

interface ILinkButtonProps {
  children: ReactNode;
  to: ERoutes;
}
const LinkButton = memo<ILinkButtonProps>(({ children, to }) => {
  return (
    <Link to={to}>
      <button>{children}</button>
    </Link>
  );
});

export const Welcome = memo(() => {
  const isAuth = useAppSelector(authSelector);

  if (!isAuth) {
    return (
      <div style={style}>
        <LinkButton to={ERoutes.singIn}>Sign In</LinkButton>
        <LinkButton to={ERoutes.singUp}>Sign Up</LinkButton>
      </div>
    );
  }

  return <LinkButton to={ERoutes.main}>Go to main page</LinkButton>;

  return (
    <>
      <TEST__Registration />
      <TEST__Login />
    </>
  );
});
