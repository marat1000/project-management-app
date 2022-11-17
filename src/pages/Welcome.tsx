import React, { memo } from 'react';
import { TEST__Registration } from '../components/TEST__Registration';
import { TEST__Login } from '../components/TEST__Login';
import { TEST__Main } from '../components/TEST__Main';
import { useAppSelector } from '../store/hooks';
import { authSelector } from '../store/slices/authSlice';

export const Welcome = memo(() => {
  const isAuth = useAppSelector(authSelector);
  if (isAuth) {
    return <TEST__Main />;
  }

  return (
    <>
      <TEST__Registration />
      <TEST__Login />
    </>
  );
});
