import React from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logOut } from 'store/slices/authSlice';
import { userLoginSelector } from 'store/slices/userSlice';

export const TEST__Main = memo(() => {
  const userLogin = useAppSelector(userLoginSelector);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <div>authorized as {userLogin}</div>
      <button onClick={logout}> logout</button>
    </div>
  );
});
