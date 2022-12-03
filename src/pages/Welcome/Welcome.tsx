import { Button } from 'components/Button/Button';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo, useEffect } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectAuthorizationFlag } from 'store/slices/auth/authSelectors';
import { ERoutes } from 'ts/enums';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from '../../common/ErrorBoundary';

export const Welcome = memo(() => {
  const isAuth = useAppSelector(selectAuthorizationFlag);
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <StartPagesLayout>
        <div className="welcome__image">
          <div className="welcome__buttons-container">
            {isAuth ? (
              <>
                <ErrorBoundary>
                  <Button to={ERoutes.main}>{t('goToMainPage')}</Button>
                </ErrorBoundary>
                <ErrorBoundary>
                  <Button to={ERoutes.main} color="add">
                    {t('goToMainPage')}
                  </Button>
                </ErrorBoundary>
              </>
            ) : (
              <>
                <ErrorBoundary>
                  <Button to={ERoutes.singIn}>{t('signIn')}</Button>
                </ErrorBoundary>
                <ErrorBoundary>
                  <Button to={ERoutes.singUp} color="add">
                    {t('signUp')}
                  </Button>
                </ErrorBoundary>
              </>
            )}
          </div>
        </div>
      </StartPagesLayout>
    </ErrorBoundary>
  );
});
