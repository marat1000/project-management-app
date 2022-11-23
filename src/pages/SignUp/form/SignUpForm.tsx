import { Button } from 'components/Button/Button';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import React, { memo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { signUp, clearRegistrationError, selectRegistrationFlags } from 'store/slices/authSlice';
import { ERoutes } from 'ts/enums';

export const SignUpForm = memo(() => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectRegistrationFlags);
  const navigate = useNavigate();
  const isRedirect = useSearchParams()[0].get('redirect');

  const nameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const clearError = () => {
    dispatch(clearRegistrationError());
  };

  const submit = () => {
    if (!nameRef.current || !loginRef.current || !passwordRef.current) {
      return;
    }
    const isNameValid = nameRef.current.checkValidity();
    const isLoginValid = loginRef.current.checkValidity();
    const isPasswordValid = passwordRef.current.checkValidity();

    if (isNameValid && isLoginValid && isPasswordValid) {
      const name = nameRef.current.value;
      const login = loginRef.current.value;
      const password = passwordRef.current.value;

      dispatch(signUp({ name, login, password }))
        .unwrap()
        .then(() => {
          const path = isRedirect ? '/' + isRedirect.split('-').join('/') : ERoutes.main;
          navigate(path);
        });
    }
  };

  const signInUrl = isRedirect ? `${ERoutes.singIn}?redirect=${isRedirect}` : ERoutes.singIn;
  return (
    <>
      <InputWithErrorMessage
        pattern={EPattern.name}
        placeholder="Name"
        errorMessage={EFormErrorMessages.name}
        type={EInputTypes.text}
        onChangeCb={clearError}
        ref={nameRef}
      />
      <InputWithErrorMessage
        pattern={EPattern.login}
        placeholder="Login"
        errorMessage={EFormErrorMessages.login}
        type={EInputTypes.text}
        onChangeCb={clearError}
        ref={loginRef}
      />
      <InputWithErrorMessage
        pattern={EPattern.password}
        placeholder="Password"
        errorMessage={EFormErrorMessages.password}
        type={EInputTypes.password}
        onChangeCb={clearError}
        ref={passwordRef}
      />
      <div style={{ color: 'red' }}>{error}</div>
      <Button isLoading={isLoading} onClick={submit}>
        Sign Up
      </Button>
      <Button onClick={() => navigate(signInUrl)} color="add">
        Sign In
      </Button>
    </>
  );
});
