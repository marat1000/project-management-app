import { useInputWithCb } from 'hooks/hooks';
import React from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearLoginError, loginSelector, signIn } from 'store/slices/authSlice';
import { ROUTES } from '../common/constants';

export const TEST__Login = memo(() => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(loginSelector);
  const navigate = useNavigate();

  const clearError = () => {
    dispatch(clearLoginError());
  };

  const login = useInputWithCb(clearError);
  const password = useInputWithCb(clearError);

  const submit = () => {
    dispatch(signIn({ login: login.value, password: password.value }))
      .unwrap()
      .then(() => {
        // navigate('куда-то');
        navigate(`/${ROUTES.main}`);
      });
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
