import { useInput } from 'hooks/hooks';
import React from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { loginSelector, signIn } from 'store/slices/authSlice';

export const TEST__Login = memo(() => {
  const login = useInput();
  const password = useInput();
  const { isLoading, error } = useAppSelector(loginSelector);
  const dispatch = useAppDispatch();

  const submit = () => {
    dispatch(signIn({ login: login.value, password: password.value }));
  };

  if (isLoading) {
    return <div> loading </div>;
  }

  return (
    <div>
      <input placeholder="login" {...login} />
      <input placeholder="password" {...password} type="password" />
      <button onClick={submit}>login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
});
