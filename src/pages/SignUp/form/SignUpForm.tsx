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
import { selectRegistrationFlags } from 'store/slices/auth/authSelectors';
import { clearRegistrationError } from 'store/slices/auth/authSlice';
import { signUp } from 'store/slices/auth/authThunks';
import { ERoutes } from 'ts/enums';
import { useTranslation } from 'react-i18next';

export const SignUpForm = memo(() => {
  const { t } = useTranslation();
  const message = {
    thisLoginAlreadyExists: t('thisLoginAlreadyExists'),
    unknownError: t('unknownError'),
  };
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

      dispatch(signUp({ name, login, password, message }))
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
        placeholder={String(t('name'))}
        errorMessage={t('nameError')}
        type={EInputTypes.text}
        onChangeCb={clearError}
        ref={nameRef}
      />
      <InputWithErrorMessage
        pattern={EPattern.login}
        placeholder={String(t('login'))}
        errorMessage={t('loginError')}
        type={EInputTypes.text}
        onChangeCb={clearError}
        ref={loginRef}
      />
      <InputWithErrorMessage
        pattern={EPattern.password}
        placeholder={String(t('password'))}
        errorMessage={t('passwordError')}
        type={EInputTypes.password}
        onChangeCb={clearError}
        ref={passwordRef}
      />
      <div style={{ color: 'red' }}>{error}</div>
      <Button isLoading={isLoading} onClick={submit}>
        {t('signUp')}
      </Button>
      <Button onClick={() => navigate(signInUrl)} color="add">
        {t('signIn')}
      </Button>
    </>
  );
});
