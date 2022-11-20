import { AuthContainer } from 'components/AuthContainer/AuthContainer';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { SignUpForm } from './form/SignUpForm';

export const SignUp = memo(() => {
  return (
    <StartPagesLayout>
      <AuthContainer title="Welcome">
        <SignUpForm></SignUpForm>
      </AuthContainer>
    </StartPagesLayout>
  );
});
