import { AuthContainer } from 'components/AuthContainer/AuthContainer';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { SignInForm } from './form/SignInForm';
import { useTranslation } from 'react-i18next';

export const SignIn = memo(() => {
  const { t } = useTranslation();

  return (
    <StartPagesLayout>
      <AuthContainer title={t('welcomeBack')}>
        <SignInForm></SignInForm>
      </AuthContainer>
    </StartPagesLayout>
  );
});
