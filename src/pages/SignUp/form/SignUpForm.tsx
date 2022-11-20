import { Button } from 'components/Button/Button';
import {
  EFormErrorMessages,
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/Input';
import { useInputWithCb } from 'hooks/hooks';
import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { signUp, clearRegistrationError, registerSelector } from 'store/slices/authSlice';
import { ERoutes } from 'ts/enums';

export const SignUpForm = memo(() => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(registerSelector);
  const navigate = useNavigate();

  const clearError = () => {
    dispatch(clearRegistrationError());
  };

  const submit = () => {
    dispatch(signUp({ name: name.value, login: login.value, password: password.value }))
      .unwrap()
      .then(() => {
        navigate(ERoutes.main);
      });
  };

  const login = useInputWithCb(clearError);
  const password = useInputWithCb(clearError);
  const name = useInputWithCb(clearError);

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
      {/* <input type="text" {...name} className="input" placeholder="Name" /> */}
      {/* <input type="text" {...login} className="input" placeholder="Login" />
      <input type="password" {...password} className="input" placeholder="Password" /> */}
      <Button onClick={submit}>Sign Up</Button>
      <Button onClick={() => navigate(`${ERoutes.singIn}`)} color="add">
        Sign In
      </Button>
    </>
  );
});
