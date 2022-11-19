import { Button } from 'components/Button/Button';
import { CentralContainer } from 'components/CentralContainer/CentralContainer';
import React, { memo } from 'react';
import { ERoutes } from 'ts/enums';
export const Welcome = memo(() => {
  return (
    <div className="welcome__container">
      <header> Boardello </header>
      <CentralContainer className="welcome__content">
        <div className="welcome__image">
          <div className="welcome__buttons-container">
            <Button to={ERoutes.singIn}>Sign in</Button>
            <Button to={ERoutes.singUp} color="add">
              Sign up
            </Button>
          </div>
        </div>
      </CentralContainer>
    </div>
  );
});
