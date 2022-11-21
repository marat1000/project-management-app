import { Button } from 'components/Button/Button';
import {
  InputWithErrorMessage,
  EPattern,
  EInputTypes,
  EFormErrorMessages,
} from 'components/Input/Input';
import { useInputWithCb } from 'hooks/hooks';
import React, { memo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { loginSelector, clearLoginError, signIn } from 'store/slices/authSlice';
import { ERoutes } from 'ts/enums';

export const SignInForm = memo(() => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(loginSelector);
  const navigate = useNavigate();
  const isRedirect = useSearchParams()[0].get('redirect');

  const clearError = () => {
    dispatch(clearLoginError());
  };

  const login = useInputWithCb(clearError);
  const password = useInputWithCb(clearError);

  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const isValid = loginRef.current?.checkValidity() && passwordRef.current?.checkValidity();
    if (!isValid) return;
    dispatch(signIn({ login: login.value, password: password.value }))
      .unwrap()
      .then(() => {
        const path = isRedirect ? '/' + isRedirect.split('-').join('/') : ERoutes.main;
        navigate(path);
      });
  };

  const signUpUrl = isRedirect ? `${ERoutes.singUp}?redirect=${isRedirect}` : ERoutes.singUp;
  return (
    <>
      <InputWithErrorMessage
        pattern={EPattern.login}
        placeholder="Login"
        errorMessage={EFormErrorMessages.login}
        type={EInputTypes.text}
        hook={login}
        ref={loginRef}
      />
      <InputWithErrorMessage
        pattern={EPattern.password}
        placeholder="Password"
        errorMessage={EFormErrorMessages.password}
        type={EInputTypes.password}
        hook={password}
        ref={passwordRef}
      />
      <div style={{ color: 'red' }}>{error}</div>
      <Button isLoading={isLoading} onClick={submit}>
        Sign In
      </Button>
      <Button onClick={() => navigate(signUpUrl)} color="add">
        Sign Up
      </Button>
    </>
  );
});
