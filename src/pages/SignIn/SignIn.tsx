import { AuthContainer } from 'components/AuthContainer/AuthContainer';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { SignInForm } from './form/SignInForm';
import { SignInForm_2 } from './form/SignInForm2';

export const SignIn = memo(() => {
  return (
    <StartPagesLayout>
      <AuthContainer title="Welcome back">
        <SignInForm_2></SignInForm_2>
      </AuthContainer>
    </StartPagesLayout>
  );
});
