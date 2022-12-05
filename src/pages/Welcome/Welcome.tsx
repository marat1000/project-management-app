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
        <section className={`welcome__school-info`}>
          <b className={`welcome__heading`}>
            Приложение разработано студентами группы &quot;React 2022 Q3&quot; курcа
            &quot;React&quot; RS School
          </b>
          <p>
            RS School is free-of-charge and community-based education program conducted by The
            Rolling Scopes developer community since 2013. The mentors and trainers of our school
            are front-end and javascript developers from different companies and countries.
          </p>
        </section>
        <section className={`welcome__team`}>
          <h2 className={`welcome__heading`}>Наша команда:</h2>
          <div className={`welcome__team-content`}>
            <a href="https://github.com/Wsko-12" target="_blank" rel="noreferrer">
              <b>Влад</b>
              <span>Фронтенд разработчик</span>
            </a>
            <a href="https://github.com/Aleg3000" target="_blank" rel="noreferrer">
              <b>Олег</b>
              <span>Фронтенд разработчик</span>
            </a>
            <a href="https://github.com/marat1000" target="_blank" rel="noreferrer">
              <b>Марат</b>
              <span>Фронтенд разработчик, тимлид</span>
            </a>
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
});
