import './App.css';
import React, { memo } from 'react';
import { useAppDispatch, useAppSelector, useFirstCheckAuth } from 'store/hooks';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Welcome } from './pages/Welcome/Welcome';
import { Page404 } from './pages/Page404';
import { ERoutes } from 'ts/enums';
import { SignIn } from 'pages/SignIn/SignIn';
import { SignUp } from 'pages/SignUp/SignUp';
import { Layout } from 'components/Layout';
// import { EditProfile } from 'pages/Profile';
import { Board } from 'pages/Board/Board';
import { Main } from 'pages/Main/Main';
import { selectAuthCheckingFlag, selectAuthorizationFlag } from 'store/slices/auth/authSelectors';
import { changeTheme, EThemes } from 'store/slices/settings/settingsSlice';
import { selectIsDark } from 'store/slices/settings/settingsSelectors';

const AuthRoutes = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path={ERoutes.main} element={<Navigate to={'/'} />} />
      <Route path={ERoutes.welcome} element={<Welcome />} />
      {/* <Route path={ERoutes.profile} element={<EditProfile />} /> */}
      <Route path={`${ERoutes.boards}/:id`} element={<Board />} />

      {/* redirect because user logged  */}
      <Route path={ERoutes.singIn} element={<Navigate to={'/'} />} />
      <Route path={ERoutes.singUp} element={<Navigate to={'/'} />} />
    </Routes>
  );
});

const NonAuthRoutes = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ERoutes.welcome} />} />
      <Route path={ERoutes.main} element={<Navigate to={ERoutes.welcome} />} />
      {/* <Route path={ERoutes.profile} element={<Navigate to={ERoutes.welcome} />} /> */}
      <Route path={`${ERoutes.boards}/:id`} element={<Board />} />

      <Route path={ERoutes.welcome} element={<Welcome />} />
      <Route path={ERoutes.singIn} element={<SignIn />} />
      <Route path={ERoutes.singUp} element={<SignUp />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});

function App() {
  const isChecking = useAppSelector(selectAuthCheckingFlag);
  const isAuth = useAppSelector(selectAuthorizationFlag);
  const currentHours = new Date().getHours();
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(selectIsDark);
  if (!isDark) {
    console.log('change');
    if (currentHours > 17 || currentHours < 8) {
      dispatch(changeTheme(EThemes.DARK));
    } else {
      dispatch(changeTheme(EThemes.LIGHT));
    }
  }

  const currentTheme = useAppSelector((state) => state.settings.theme);
  // console.log(currentTheme);

  useFirstCheckAuth();

  if (isChecking) {
    return <div>authorization check</div>;
  }

  return (
    <BrowserRouter>
      <Layout> {isAuth ? <AuthRoutes /> : <NonAuthRoutes />}</Layout>
    </BrowserRouter>
  );
}

export default App;
