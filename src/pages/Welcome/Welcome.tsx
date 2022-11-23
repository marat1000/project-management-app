import { Button } from 'components/Button/Button';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectAuthorizationFlag } from 'store/slices/authSlice';
import { ERoutes } from 'ts/enums';
export const Welcome = memo(() => {
  const isAuth = useAppSelector(selectAuthorizationFlag);
  return (
    <StartPagesLayout>
      <div className="welcome__image">
        <div className="welcome__buttons-container">
          {isAuth ? (
            <>
              <Button to={ERoutes.main}>Go to main page</Button>
              <Button to={ERoutes.main} color="add">
                Go to main page
              </Button>
            </>
          ) : (
            <>
              <Button to={ERoutes.singIn}>Sign in</Button>
              <Button to={ERoutes.singUp} color="add">
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </StartPagesLayout>
  );
});
