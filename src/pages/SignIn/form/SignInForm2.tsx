import { Button } from 'components/Button/Button';
import { EPattern, EInputTypes, EFormErrorMessages } from 'components/Input/Input';
import { InputWithError } from 'components/Input/InputWithError';
import { useInputWithCb } from 'hooks/hooks';
import React, { memo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { loginSelector, clearLoginError, signIn } from 'store/slices/authSlice';
import { ERoutes } from 'ts/enums';

export const SignInForm_2 = memo(() => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(loginSelector);
  const navigate = useNavigate();
  const isRedirect = useSearchParams()[0].get('redirect');

  const loginRef = useRef<HTMLInputElement>(null);

  const clearError = () => {
    dispatch(clearLoginError());
  };

  const submit = () => {
    const isLoginValid = loginRef.current?.checkValidity();
    console.log('isLoginValid', isLoginValid);
    return;
    dispatch(signIn({ login: login.value, password: password.value }))
      .unwrap()
      .then(() => {
        const path = isRedirect ? '/' + isRedirect.split('-').join('/') : ERoutes.main;
        navigate(path);
      });
  };

  const login = useInputWithCb(clearError);
  const password = useInputWithCb(clearError);

  const signUpUrl = isRedirect ? `${ERoutes.singUp}?redirect=${isRedirect}` : ERoutes.singUp;
  return (
    <>
      <InputWithError
        ref={loginRef}
        pattern={EPattern.login}
        placeholder="Login"
        type={EInputTypes.text}
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
