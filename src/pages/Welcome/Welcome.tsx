import { Button } from 'components/Button/Button';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectAuthorizationFlag } from 'store/slices/auth/authSelectors';
import { ERoutes } from 'ts/enums';
import ErrorBoundary from '../../common/ErrorBoundary';
import { selectLanguage } from 'store/slices/settings/settingsSelectors';
import { langConfig } from 'language/langConfig';
import { SmoothCorners } from 'react-smooth-corners';

export const Welcome = memo(() => {
  const isAuth = useAppSelector(selectAuthorizationFlag);
  const lang = useAppSelector(selectLanguage);
  return (
    <ErrorBoundary>
      <div className={`welcome`}>
        <StartPagesLayout>
          <SmoothCorners
            corners="22, 16"
            borderRadius="25px"
            as="div"
            className="welcome__inner-wrapper"
          >
            <div className="welcome__image">
              <div className="welcome__buttons-container">
                {isAuth ? (
                  <>
                    <ErrorBoundary>
                      <Button to={ERoutes.main}>{langConfig.goToMainPage[lang]}</Button>
                    </ErrorBoundary>
                    <ErrorBoundary>
                      <Button to={ERoutes.main} color="add">
                        {langConfig.goToMainPage[lang]}
                      </Button>
                    </ErrorBoundary>
                  </>
                ) : (
                  <>
                    <ErrorBoundary>
                      <Button to={ERoutes.singIn}>{langConfig.signIn[lang]}</Button>
                    </ErrorBoundary>
                    <ErrorBoundary>
                      <Button to={ERoutes.singUp} color="add">
                        {langConfig.signUp[lang]}
                      </Button>
                    </ErrorBoundary>
                  </>
                )}
              </div>
            </div>
          </SmoothCorners>
        </StartPagesLayout>
      </div>
    </ErrorBoundary>
  );
});
