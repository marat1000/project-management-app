import { Button } from 'components/Button/Button';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { ERoutes } from 'ts/enums';
export const Welcome = memo(() => {
  return (
    <StartPagesLayout>
      <div className="welcome__image">
        <div className="welcome__buttons-container">
          <Button to={ERoutes.singIn}>Sign in</Button>
          <Button to={ERoutes.singUp} color="add">
            Sign up
          </Button>
        </div>
      </div>
    </StartPagesLayout>
  );
});
