import { Button } from 'components/Button/Button';
import {
  EInputTypes,
  EPattern,
  InputWithErrorMessage,
} from 'components/Input/InputWithErrorMessage';
import { langConfig } from 'language/langConfig';
import React, { memo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectRegistrationFlags } from 'store/slices/auth/authSelectors';
import { clearRegistrationError } from 'store/slices/auth/authSlice';
import { signUp } from 'store/slices/auth/authThunks';
import { selectLanguage } from 'store/slices/settings/settingsSelectors';
import { ERoutes } from 'ts/enums';

export const SignUpForm = memo(() => {
  const lang = useAppSelector(selectLanguage);

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
        placeholder={langConfig.name[lang]}
        errorMessage={langConfig.nameError[lang]}
        type={EInputTypes.text}
        onChangeCb={clearError}
        ref={nameRef}
      />
      <InputWithErrorMessage
        pattern={EPattern.login}
        placeholder={langConfig.login[lang]}
        errorMessage={langConfig.loginError[lang]}
        type={EInputTypes.text}
        onChangeCb={clearError}
        ref={loginRef}
      />
      <InputWithErrorMessage
        pattern={EPattern.password}
        placeholder={langConfig.password[lang]}
        errorMessage={langConfig.passwordError[lang]}
        type={EInputTypes.password}
        onChangeCb={clearError}
        ref={passwordRef}
      />
      {error && <div style={{ color: 'red' }}>{langConfig[error][lang]}</div>}
      <Button isLoading={isLoading} onClick={submit}>
        {langConfig.signUp[lang]}
      </Button>
      <Button onClick={() => navigate(signInUrl)} color="add">
        {langConfig.signIn[lang]}
      </Button>
    </>
  );
});
