import { AuthContainer } from 'components/AuthContainer/AuthContainer';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { SignInForm } from './form/SignInForm';

export const SignIn = memo(() => {
  return (
    <StartPagesLayout>
      <AuthContainer title="Welcome back">
        <SignInForm></SignInForm>
      </AuthContainer>
    </StartPagesLayout>
  );
});
