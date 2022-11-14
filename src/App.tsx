import './App.css';
import React from 'react';
import { TEST__Registration } from 'components/TEST__Registration';
import { useAppSelector } from 'store/hooks';
import { authSelector, userLoginSelector } from 'store/slices/authSlice';
import { TEST__Login } from 'components/TEST__Login';

function App() {
  const isAuth = useAppSelector(authSelector);
  const userLogin = useAppSelector(userLoginSelector);
  if (isAuth) {
    return <div>authorized as {userLogin}</div>;
  }
  return (
    <>
      <TEST__Registration />
      <TEST__Login />
    </>
  );
}

export default App;
