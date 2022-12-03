import { AuthContainer } from 'components/AuthContainer/AuthContainer';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { SignUpForm } from './form/SignUpForm';
import ErrorBoundary from '../../common/ErrorBoundary';

export const SignUp = memo(() => {
  return (
    <StartPagesLayout>
      <ErrorBoundary>
        <AuthContainer title="Welcome">
          <ErrorBoundary>
            <SignUpForm></SignUpForm>
          </ErrorBoundary>
        </AuthContainer>
      </ErrorBoundary>
    </StartPagesLayout>
  );
});
