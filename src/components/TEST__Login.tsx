import { useInputWithCb } from 'hooks/hooks';
import React from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { clearLoginError, loginSelector, signIn } from 'store/slices/authSlice';
import { ERoutes } from 'ts/enums';

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
        navigate(`/${ERoutes.main}`);
      });
  };

  if (isLoading) {
    return <div> loading </div>;
  }

  return (
    <div className="sign-in-container">
      <div className="window-container">
        <div className="form__sign-up-container">
          <h2 className="h2-hehe">Welcome</h2>
          <input className="input" placeholder="login" {...login} />
          <input className="input" placeholder="password" {...password} type="password" />
          <button className="button" onClick={submit}>
            login
          </button>
        </div>
        <div className="beatiful-picture-container">
          <div className="picture"></div>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
});
