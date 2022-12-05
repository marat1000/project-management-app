import { AuthContainer } from 'components/AuthContainer/AuthContainer';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { SignInForm } from './form/SignInForm';
import ErrorBoundary from '../../common/ErrorBoundary';
import { useAppSelector } from 'store/hooks';
import { selectLanguage } from 'store/slices/settings/settingsSelectors';
import { langConfig } from 'language/langConfig';

export const SignIn = memo(() => {
  const lang = useAppSelector(selectLanguage);

  return (
    <StartPagesLayout>
      <ErrorBoundary>
        <AuthContainer title={langConfig.welcomeBack[lang]}>
          <ErrorBoundary>
            <SignInForm></SignInForm>
          </ErrorBoundary>
        </AuthContainer>
      </ErrorBoundary>
    </StartPagesLayout>
  );
});
