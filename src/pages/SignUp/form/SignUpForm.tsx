import { Button } from 'components/Button/Button';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/Input';
import { useInputWithCb } from 'hooks/hooks';
import React, { memo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { signUp, clearRegistrationError, registerSelector } from 'store/slices/authSlice';
import { ERoutes } from 'ts/enums';

export const SignUpForm = memo(() => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(registerSelector);
  const navigate = useNavigate();
  const isRedirect = useSearchParams()[0].get('redirect');

  const clearError = () => {
    dispatch(clearRegistrationError());
  };

  const submit = () => {
    dispatch(signUp({ name: name.value, login: login.value, password: password.value }))
      .unwrap()
      .then(() => {
        const path = isRedirect ? '/' + isRedirect.split('-').join('/') : ERoutes.main;
        navigate(path);
      });
  };

  const login = useInputWithCb(clearError);
  const password = useInputWithCb(clearError);
  const name = useInputWithCb(clearError);

  const signInUrl = isRedirect ? `${ERoutes.singIn}?redirect=${isRedirect}` : ERoutes.singIn;
  return (
    <>
      <InputWithErrorMessage
        pattern={EPattern.name}
        placeholder="Name"
        errorMessage={EFormErrorMessages.name}
        type={EInputTypes.text}
        hook={name}
      />
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
        Sign Up
      </Button>
      <Button onClick={() => navigate(signInUrl)} color="add">
        Sign In
      </Button>
    </>
  );
});
