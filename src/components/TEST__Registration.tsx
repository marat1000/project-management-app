import { useInput } from 'hooks/hooks';
import React from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { registerSelector, signUp } from 'store/slices/authSlice';

export const TEST__Registration = memo(() => {
  const login = useInput();
  const password = useInput();
  const name = useInput();
  const { error, isLoading } = useAppSelector(registerSelector);
  const dispatch = useAppDispatch();

  const submit = () => {
    dispatch(signUp({ name: name.value, login: login.value, password: password.value }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input placeholder="name" {...name} />
      <input placeholder="login" {...login} />
      <input placeholder="password" {...password} type="password" />
      <button onClick={submit}>Register</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
});
