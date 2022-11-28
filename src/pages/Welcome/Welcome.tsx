import { Button } from 'components/Button/Button';
import { StartPagesLayout } from 'components/StartPagesLayout/StartPagesLayout';
import React, { memo } from 'react';
import { useAppSelector } from 'store/hooks';
import { selectAuthorizationFlag } from 'store/slices/auth/authSelectors';
import { ERoutes } from 'ts/enums';
import { useTranslation } from 'react-i18next';

export const Welcome = memo(() => {
  const isAuth = useAppSelector(selectAuthorizationFlag);
  const { t } = useTranslation();

  return (
    <StartPagesLayout>
      <div className="welcome__image">
        <div className="welcome__buttons-container">
          {isAuth ? (
            <>
              <Button to={ERoutes.main}>{t('goToMainPage')}</Button>
              <Button to={ERoutes.main} color="add">
                {t('goToMainPage')}
              </Button>
            </>
          ) : (
            <>
              <Button to={ERoutes.singIn}>{t('signIn')}</Button>
              <Button to={ERoutes.singUp} color="add">
                {t('signUp')}
              </Button>
            </>
          )}
        </div>
      </div>
    </StartPagesLayout>
  );
});
