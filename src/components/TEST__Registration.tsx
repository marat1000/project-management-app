import { useInputWithCb } from 'hooks/hooks';
import React from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearRegistrationError, registerSelector, signUp } from 'store/slices/authSlice';
import { ROUTES } from '../common/constants';

export const TEST__Registration = memo(() => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(registerSelector);
  const navigate = useNavigate();

  const clearError = () => {
    dispatch(clearRegistrationError());
  };

  const login = useInputWithCb(clearError);
  const password = useInputWithCb(clearError);
  const name = useInputWithCb(clearError);

  const submit = () => {
    dispatch(signUp({ name: name.value, login: login.value, password: password.value }))
      .unwrap()
      .then(() => {
        /*
         посмотри куда там должно редиректить после успешного signup
         я сделал так, чтобы оно автоматически делало signin после signup
         так что тут такой же редирект как и у singin
         */
        // navigate('куда-то');
        navigate(`/${ROUTES.main}`);
      });
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
