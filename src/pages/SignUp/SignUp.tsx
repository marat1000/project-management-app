import { AuthContainer } from 'components/AuthContainer/AuthContainer';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { SignUpForm } from './form/SignUpForm';
import ErrorBoundary from '../../common/ErrorBoundary';
import { useAppSelector } from 'store/hooks';
import { selectLanguage } from 'store/slices/settings/settingsSelectors';
import { langConfig } from 'language/langConfig';

export const SignUp = memo(() => {
  const lang = useAppSelector(selectLanguage);

  return (
    <StartPagesLayout>
      <ErrorBoundary>
        <AuthContainer title={langConfig.welcome[lang]}>
          <ErrorBoundary>
            <SignUpForm></SignUpForm>
          </ErrorBoundary>
        </AuthContainer>
      </ErrorBoundary>
    </StartPagesLayout>
  );
});
