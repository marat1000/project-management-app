import React from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logOut } from 'store/slices/authSlice';
import { userLoginSelector, userNameSelector } from 'store/slices/userSlice';

export const TEST__Main = memo(() => {
  const userLogin = useAppSelector(userLoginSelector);
  const { isLoading, username, error } = useAppSelector(userNameSelector);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(logOut());
  };

  if (error) {
    return (
      <div>
        <div>Something went wrong: {error}</div>
        <button onClick={logout}> logout</button>
      </div>
    );
  }

  return (
    <div>
      <div>authorized as {userLogin}</div>
      <div>Name: {isLoading ? 'Loading...' : username}</div>
      <button onClick={logout}> logout</button>
    </div>
  );
});
