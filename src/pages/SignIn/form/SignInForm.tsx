import { Button } from 'components/Button/Button';
import {
  InputWithErrorMessage,
  EPattern,
  EInputTypes,
  EFormErrorMessages,
} from 'components/Input/Input';
import { useInputWithCb } from 'hooks/hooks';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { loginSelector, clearLoginError, signIn } from 'store/slices/authSlice';
import { ERoutes } from 'ts/enums';

export const SignInForm = memo(() => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(loginSelector);
  const navigate = useNavigate();

  const clearError = () => {
    dispatch(clearLoginError());
  };

  const submit = () => {
    dispatch(signIn({ login: login.value, password: password.value }))
      .unwrap()
      .then(() => {
        navigate(ERoutes.main);
      });
  };

  const login = useInputWithCb(clearError);
  const password = useInputWithCb(clearError);

  return (
    <>
      <InputWithErrorMessage
        pattern={EPattern.login}
        placeholder="Login"
        errorMessage={EFormErrorMessages.login}
        type={EInputTypes.text}
        hook={login}
      />
      <InputWithErrorMessage
        pattern={EPattern.password}
        placeholder="Password"
        errorMessage={EFormErrorMessages.password}
        type={EInputTypes.password}
        hook={password}
      />
      <div style={{ color: 'red' }}>{error}</div>
      <Button isLoading={isLoading} onClick={submit}>
        Sign In
      </Button>
      <Button onClick={() => navigate(`${ERoutes.singUp}`)} color="add">
        Sign Up
      </Button>
    </>
  );
});
