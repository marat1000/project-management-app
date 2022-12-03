import { Button } from 'components/Button/Button';
import {
  InputWithErrorMessage,
  EPattern,
  EInputTypes,
} from 'components/Input/InputWithErrorMessage';
import React, { memo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectLoginFlags } from 'store/slices/auth/authSelectors';
import { clearLoginError } from 'store/slices/auth/authSlice';
import { signIn } from 'store/slices/auth/authThunks';
import { ERoutes } from 'ts/enums';
import { useTranslation } from 'react-i18next';

export const SignInForm = memo(() => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectLoginFlags);
  const navigate = useNavigate();
  const isRedirect = useSearchParams()[0].get('redirect');

  const clearError = () => {
    dispatch(clearLoginError());
  };

  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    if (!loginRef.current || !passwordRef.current) {
      return;
    }
    const isLoginValid = loginRef.current.checkValidity();
    const isPasswordValid = passwordRef.current.checkValidity();
    if (isLoginValid && isPasswordValid) {
      const login = loginRef.current.value;
      const password = passwordRef.current.value;

      dispatch(signIn({ login, password }))
        .unwrap()
        .then(() => {
          const path = isRedirect ? '/' + isRedirect.split('-').join('/') : ERoutes.main;
          navigate(path);
        });
    }
  };

  const signUpUrl = isRedirect ? `${ERoutes.singUp}?redirect=${isRedirect}` : ERoutes.singUp;

  const { t } = useTranslation();

  return (
    <>
      <InputWithErrorMessage
        pattern={EPattern.login}
        placeholder={t('login') as string}
        errorMessage={t('loginError')}
        type={EInputTypes.text}
        onChangeCb={clearError}
        ref={loginRef}
      />
      <InputWithErrorMessage
        pattern={EPattern.password}
        placeholder={t('password') as string}
        errorMessage={t('passwordError')}
        type={EInputTypes.password}
        onChangeCb={clearError}
        ref={passwordRef}
      />
      <div style={{ color: 'red' }}>{error}</div>
      <Button isLoading={isLoading} onClick={submit}>
        {t('signIn')}
      </Button>
      <Button onClick={() => navigate(signUpUrl)} color="add">
        {t('signUp')}
      </Button>
    </>
  );
});
