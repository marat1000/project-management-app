import './App.css';
import React from 'react';
import { TEST__Registration } from 'components/TEST__Registration';
import { useAppSelector, useFirstCheckAuth } from 'store/hooks';
import { authCheckingSelector, authSelector } from 'store/slices/authSlice';
import { TEST__Login } from 'components/TEST__Login';

import { TEST__Boards } from 'components/TEST__Boards/TEST__Boards';

function App() {
  const isAuth = useAppSelector(authSelector);
  const isChecking = useAppSelector(authCheckingSelector);
  useFirstCheckAuth();

  if (isChecking) {
    return <div>authorization check</div>;
  }

  if (isAuth) {
    return <TEST__Boards />;
  }

  return (
    <>
      <TEST__Registration />
      <TEST__Login />
    </>
  );
}

export default App;
