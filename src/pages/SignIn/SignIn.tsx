import { AuthContainer } from 'components/AuthContainer/AuthContainer';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { SignInForm } from './form/SignInForm';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '../../common/ErrorBoundary';

export const SignIn = memo(() => {
  const { t } = useTranslation();

  return (
    <StartPagesLayout>
      <ErrorBoundary>
        <AuthContainer title={t('welcomeBack')}>
          <ErrorBoundary>
            <SignInForm></SignInForm>
          </ErrorBoundary>
        </AuthContainer>
      </ErrorBoundary>
    </StartPagesLayout>
  );
});
